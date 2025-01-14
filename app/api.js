import { eventHandler, setResponseStatus } from "vinxi/http";
import { defineRoutes } from "./routes";
import { pathToRegexp } from "vinxi/fs-router";

const appInstance = {
  __routes: [],
};

appInstance.add = (path, handlerImport) => {
  appInstance.__routes.push({
    path,
    regex: pathToRegexp(path),
    $handler: {
      import: handlerImport,
      pick: ["default"],
    },
  });
};

defineRoutes(appInstance);

export default eventHandler(async (ev) => {
  const removeBase =
    "/" +
    ev.path
      .replace(/^\/api/, "/")
      .split("/")
      .filter(Boolean)
      .join("/");

  const matched = appInstance.__routes.find((d) => {
    return d.regex.test(removeBase);
  });

  if (!matched) {
    setResponseStatus(ev, 404);
    return "404";
  }

  const imported = await matched.$handler.import();
  return await imported.default(ev);
});
