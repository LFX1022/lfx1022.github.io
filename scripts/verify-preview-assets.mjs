const target = process.argv[2] ?? process.env.PREVIEW_URL ?? "http://localhost:3001";
const pageUrl = new URL(target);

function decodeHtmlAttribute(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "cache-control": "no-cache",
      pragma: "no-cache",
    },
  });

  if (!response.ok) {
    throw new Error(`${url} returned HTTP ${response.status}`);
  }

  return response.text();
}

const html = await fetchText(pageUrl);
const assetUrls = new Set();
const tagPattern = /<(?:link|script)\b[^>]*(?:href|src)=["']([^"']+)["'][^>]*>/gi;
let match;

while ((match = tagPattern.exec(html)) !== null) {
  const value = decodeHtmlAttribute(match[1]);
  if (value.startsWith("/_next/static/") && /\.(css|js)(?:\?|$)/i.test(value)) {
    assetUrls.add(new URL(value, pageUrl).toString());
  }
}

if (assetUrls.size === 0) {
  throw new Error(`No Next.js CSS or JS assets found in ${pageUrl}`);
}

const failures = [];

for (const assetUrl of assetUrls) {
  try {
    const response = await fetch(assetUrl, {
      headers: {
        "cache-control": "no-cache",
        pragma: "no-cache",
      },
    });

    if (!response.ok) {
      failures.push(`${assetUrl} returned HTTP ${response.status}`);
      continue;
    }

    const body = await response.text();
    if (body.length === 0) {
      failures.push(`${assetUrl} returned an empty response`);
    }
  } catch (error) {
    failures.push(`${assetUrl} failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

if (failures.length > 0) {
  console.error("Preview asset check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Preview asset check passed: ${assetUrls.size} Next.js CSS/JS asset(s) reachable from ${pageUrl}`);