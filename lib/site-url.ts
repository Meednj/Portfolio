/**
 * Canonical site origin supplied at build time once the public domain is known.
 * Returns undefined during local development and unconfigured CI builds.
 */
export function getSiteUrl(): URL | undefined {
  const configuredUrl = process.env.SITE_URL?.trim();
  if (!configuredUrl) return undefined;

  const url = new URL(configuredUrl);
  const isLocalHttp =
    url.protocol === "http:" &&
    (url.hostname === "localhost" || url.hostname === "127.0.0.1");

  if (url.protocol !== "https:" && !isLocalHttp) {
    throw new Error("SITE_URL must use HTTPS (HTTP is allowed for localhost only).");
  }
  if (url.username || url.password || url.pathname !== "/" || url.search || url.hash) {
    throw new Error("SITE_URL must be an origin without credentials, path, query, or hash.");
  }

  return new URL(url.origin);
}
