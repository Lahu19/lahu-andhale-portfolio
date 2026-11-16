import { readdirSync, writeFileSync } from "fs";
import { join } from "path";

const clientDir = "dist/client/assets";
const files = readdirSync(clientDir);

const jsEntry = files.find((f) => f.startsWith("index-") && f.endsWith(".js"));
const cssEntry = files.find((f) => f.startsWith("styles-") && f.endsWith(".css"));

if (!jsEntry) {
  console.error("Could not find index JS entry in dist/client/assets");
  process.exit(1);
}

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lahu Andhale — Design × Code × AI</title>
    <meta name="description" content="Lahu Andhale builds thoughtful interfaces, resilient frontend systems, and useful AI experiences." />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="icon" href="/favicon.ico" type="image/x-icon" />
    ${cssEntry ? `<link rel="stylesheet" href="/_build/assets/${cssEntry}" />` : ""}
    <link rel="modulepreload" href="/_build/assets/${jsEntry}" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/_build/assets/${jsEntry}"></script>
  </body>
</html>`;

writeFileSync("dist/client/index.html", html);
console.log(`Generated dist/client/index.html (js: ${jsEntry}, css: ${cssEntry})`);
