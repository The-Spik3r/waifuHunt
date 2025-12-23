import { Hono } from "hono";
// import { zValidator } from "@hono/zod-validator";
import { describeRoute } from "hono-openapi";
import { validator as zValidator } from "hono-openapi/zod";

import { z } from "zod";
import { CreateUserBody, UserResponse } from "./validation";

export const userRoute = new Hono()
  .get(
    "/",
    describeRoute({
      tags: ["Users"],
    }),
    async (c) => {
      const { userService } = c.get("dependencies");
      const users = await userService.getAllUser();
      return c.json(users);
    }
  )
  .post(
    "/",
    zValidator("json", CreateUserBody),
    describeRoute({
      tags: ["Users"],
    }),
    async (c) => {
      const { userService } = c.get("dependencies");
      const body = c.req.valid("json");
      const newUser = await userService.createUser(body);
      return c.json(newUser, 201);
    }
  )
  .get(
    "/:id",
    describeRoute({
      tags: ["Users"],
    }),
    async (c) => {
      const { userService } = c.get("dependencies");
      const id = c.req.param("id");
      const user = await userService.getUserById(id);
      return c.json(user);
    }
  );
