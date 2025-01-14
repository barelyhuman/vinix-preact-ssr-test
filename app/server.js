import { App } from "./App";
import { h } from "preact";
import { eventHandler } from "vinxi/http";
import { renderToString } from "preact-render-to-string";
import { getManifest } from "vinxi/manifest";

export default eventHandler(async (event) => {
  const clientManifest = getManifest("client");
  const clientHandler = clientManifest.inputs[clientManifest.handler];
  const scriptSrc = clientHandler.output.path;
  const componentHTML = renderToString(h(App, { url: event.path }));
  const finalHTML = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap" rel="stylesheet">
        <script src="https://cdn.twind.style" crossorigin></script>
        <style>
          body{ 
            font-family: "Shadows Into Light";
          }
        </style>
      </head>
      <body>
        <div id="_mount">
            ${componentHTML}
        </div>
        <script type="module" src="${scriptSrc}"></script>
      </body>
    </html>
  `;
  event.node.res.setHeader("Content-Type", "text/html");
  return finalHTML;
});
