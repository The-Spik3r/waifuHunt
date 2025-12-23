import { createMiddleware } from "hono/factory";
import { dependecyContainer } from "@config/dependecyContainer";

export const inyectDependencyContainer = createMiddleware(async (c, next) => {
  c.set("dependencies", dependecyContainer);
  await next();
});
