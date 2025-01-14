/**
 *
 * @param {object} router
 * @param {(path:string, source:string) => void } router.add
 * @returns
 */
export function defineRoutes(router) {
  router.add("/x", () => import("./api/home.js"));
}
