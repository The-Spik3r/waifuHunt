import { Hono } from "hono";
import { userRoute } from "./user/router";

const api = new Hono();

api.route("/user", userRoute);

export default api;
