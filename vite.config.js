import preact from "@preact/preset-vite";
import { createApp } from "vinxi";

export default createApp({
  routers: [
    {
      name: "public",
      type: "static",
      dir: "./public",
    },
    {
      name: "api",
      type: "http",
      handler: "./app/api.js",
      base: "/api",
    },
    {
      name: "ssr",
      type: "http",
      handler: "./app/server.js",
      plugins: () => [preact()],
      target: "server",
    },
    {
      name: "client",
      type: "client",
      handler: "./app/client.jsx",
      plugins: () => [preact()],
      target: "browser",
      base: "/_build",
    },
  ],
});
