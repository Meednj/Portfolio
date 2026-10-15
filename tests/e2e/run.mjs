import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const serverUrl = "http://127.0.0.1:4173";
const server = spawn(
  process.execPath,
  [".next/standalone/server.js"],
  { stdio: "inherit", env: { ...process.env, HOSTNAME: "127.0.0.1", PORT: "4173" } },
);

let serverExitCode;
server.once("exit", (code) => {
  serverExitCode = code;
});

async function waitForServer() {
  const deadline = Date.now() + 60_000;

  while (Date.now() < deadline) {
    if (serverExitCode !== undefined) {
      throw new Error(`Next.js server exited before becoming ready (code ${serverExitCode}).`);
    }

    try {
      const response = await fetch(serverUrl, { signal: AbortSignal.timeout(2_000) });
      if (response.ok) return;
    } catch {
      // Keep waiting while Next.js starts.
    }

    await delay(250);
  }

  throw new Error(`Next.js server did not become ready at ${serverUrl}.`);
}

async function stopServer() {
  if (serverExitCode !== undefined) return;

  const exited = new Promise((resolve) => {
    server.once("exit", () => resolve());
  });

  server.kill("SIGTERM");
  await Promise.race([exited, delay(3_000)]);

  if (serverExitCode === undefined) {
    server.kill("SIGKILL");
    await Promise.race([exited, delay(1_000)]);
  }
}

let testExitCode = 1;

try {
  await waitForServer();
  const playwright = spawn(
    process.execPath,
    ["node_modules/playwright/cli.js", "test"],
    { stdio: "inherit" },
  );

  testExitCode = await new Promise((resolve, reject) => {
    playwright.once("error", reject);
    playwright.once("exit", (code, signal) => {
      if (code !== null) {
        resolve(code);
      } else {
        reject(new Error(`Playwright exited with signal ${signal ?? "unknown"}.`));
      }
    });
  });
} catch (error) {
  console.error(error);
} finally {
  await stopServer();
}

process.exitCode = testExitCode;
