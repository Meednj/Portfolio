import { afterEach, describe, expect, it, vi } from "vitest";
import { getSiteUrl } from "../../lib/site-url";

describe("canonical site URL", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("is optional until a production origin is supplied", () => {
    vi.stubEnv("SITE_URL", "");
    expect(getSiteUrl()).toBeUndefined();
  });

  it("normalizes a configured HTTPS origin", () => {
    vi.stubEnv("SITE_URL", "https://portfolio.example.test/");
    expect(getSiteUrl()?.toString()).toBe("https://portfolio.example.test/");
  });

  it("rejects non-HTTPS public origins and paths", () => {
    vi.stubEnv("SITE_URL", "http://portfolio.example.test");
    expect(() => getSiteUrl()).toThrow(/must use HTTPS/);

    vi.stubEnv("SITE_URL", "https://portfolio.example.test/portfolio");
    expect(() => getSiteUrl()).toThrow(/must be an origin/);
  });
});
