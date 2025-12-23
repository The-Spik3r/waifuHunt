import type { Dependencies } from "@config/dependecyContainer";

declare module "hono" {
  interface ContextVariableMap {
    dependencies: Dependencies;
  }
}
