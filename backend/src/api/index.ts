import { Hono } from "hono";
import { userRoute } from "./user/router";
import { waifuRoute } from "./waifu/router";
import { voteRoute } from "./vote/router";

const api = new Hono();

api.route("/user", userRoute);
api.route("/waifus", waifuRoute);
api.route("/votes", voteRoute);

export default api;
