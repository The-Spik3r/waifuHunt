import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import { validator as zValidator } from "hono-openapi/zod";
import { CreateVoteBody, UpdateVoteBody } from "./validation";

export const voteRoute = new Hono()
  .get(
    "/",
    describeRoute({
      tags: ["Votes"],
      description: "Obtener todos los votos con paginación",
    }),
    async (c) => {
      const { voteService } = c.get("dependencies");
      const limit = Number(c.req.query("limit")) || 100;
      const offset = Number(c.req.query("offset")) || 0;

      const votes = await voteService.getAll(limit, offset);
      return c.json(votes);
    }
  )
  .post(
    "/",
    zValidator("json", CreateVoteBody),
    describeRoute({
      tags: ["Votes"],
      description: "Crear un nuevo voto",
    }),
    async (c) => {
      const { voteService } = c.get("dependencies");
      const body = c.req.valid("json");

      try {
        const newVote = await voteService.create(body);
        return c.json(newVote, 201);
      } catch (error) {
        if (error instanceof Error && error.message.includes("already voted")) {
          return c.json({ error: "Ya has votado por esta waifu" }, 409);
        }
        throw error;
      }
    }
  )
  .get(
    "/leaderboard",
    describeRoute({
      tags: ["Votes"],
      description: "Obtener el ranking de waifus más votadas",
    }),
    async (c) => {
      const { voteService } = c.get("dependencies");
      const limit = Number(c.req.query("limit")) || 10;

      const topWaifus = await voteService.getTopWaifus(limit);
      return c.json(topWaifus);
    }
  )
  .get(
    "/user/:userId",
    describeRoute({
      tags: ["Votes"],
      description: "Obtener votos de un usuario",
    }),
    async (c) => {
      const { voteService } = c.get("dependencies");
      const userId = c.req.param("userId");
      const limit = Number(c.req.query("limit")) || 50;
      const offset = Number(c.req.query("offset")) || 0;

      const votes = await voteService.getByUserId(userId, limit, offset);
      return c.json(votes);
    }
  )
  .get(
    "/user/:userId/waifus",
    describeRoute({
      tags: ["Votes"],
      description: "Obtener waifus votadas por un usuario",
    }),
    async (c) => {
      const { voteService } = c.get("dependencies");
      const userId = c.req.param("userId");
      const limit = Number(c.req.query("limit")) || 50;
      const offset = Number(c.req.query("offset")) || 0;

      const votedWaifus = await voteService.getUserVotedWaifus(
        userId,
        limit,
        offset
      );
      return c.json(votedWaifus);
    }
  )
  .get(
    "/user/:userId/count",
    describeRoute({
      tags: ["Votes"],
      description: "Obtener el total de votos de un usuario",
    }),
    async (c) => {
      const { voteService } = c.get("dependencies");
      const userId = c.req.param("userId");

      const count = await voteService.getUserVoteCount(userId);
      return c.json({ userId, totalVotes: count });
    }
  )
  .get(
    "/waifu/:waifuId",
    describeRoute({
      tags: ["Votes"],
      description: "Obtener votos de una waifu",
    }),
    async (c) => {
      const { voteService } = c.get("dependencies");
      const waifuId = c.req.param("waifuId");
      const limit = Number(c.req.query("limit")) || 50;
      const offset = Number(c.req.query("offset")) || 0;

      const votes = await voteService.getByWaifuId(waifuId, limit, offset);
      return c.json(votes);
    }
  )
  .get(
    "/waifu/:waifuId/count",
    describeRoute({
      tags: ["Votes"],
      description: "Obtener el total de votos de una waifu",
    }),
    async (c) => {
      const { voteService } = c.get("dependencies");
      const waifuId = c.req.param("waifuId");

      const total = await voteService.getWaifuVoteCount(waifuId);
      return c.json({ waifuId, totalVotes: total });
    }
  )
  .get(
    "/check/:userId/:waifuId",
    describeRoute({
      tags: ["Votes"],
      description: "Verificar si un usuario ya votó por una waifu",
    }),
    async (c) => {
      const { voteService } = c.get("dependencies");
      const userId = c.req.param("userId");
      const waifuId = c.req.param("waifuId");

      const hasVoted = await voteService.hasUserVoted(userId, waifuId);
      return c.json({ hasVoted });
    }
  )
  .get(
    "/:id",
    describeRoute({
      tags: ["Votes"],
      description: "Obtener un voto por ID",
    }),
    async (c) => {
      const { voteService } = c.get("dependencies");
      const id = c.req.param("id");
      const vote = await voteService.getById(id);

      if (!vote) {
        return c.json({ error: "Voto no encontrado" }, 404);
      }

      return c.json(vote);
    }
  )
  .patch(
    "/:id",
    zValidator("json", UpdateVoteBody),
    describeRoute({
      tags: ["Votes"],
      description: "Actualizar el valor de un voto (boost)",
    }),
    async (c) => {
      const { voteService } = c.get("dependencies");
      const id = c.req.param("id");
      const body = c.req.valid("json");

      const updatedVote = await voteService.updateValue(id, body.value);

      if (!updatedVote) {
        return c.json({ error: "Voto no encontrado" }, 404);
      }

      return c.json(updatedVote);
    }
  )
  .delete(
    "/:id",
    describeRoute({
      tags: ["Votes"],
      description: "Eliminar un voto",
    }),
    async (c) => {
      const { voteService } = c.get("dependencies");
      const id = c.req.param("id");

      const deletedVote = await voteService.deleteById(id);

      if (!deletedVote) {
        return c.json({ error: "Voto no encontrado" }, 404);
      }

      return c.json({ message: "Voto eliminado exitosamente" });
    }
  )
  .delete(
    "/user/:userId/waifu/:waifuId",
    describeRoute({
      tags: ["Votes"],
      description: "Eliminar voto de un usuario para una waifu específica",
    }),
    async (c) => {
      const { voteService } = c.get("dependencies");
      const userId = c.req.param("userId");
      const waifuId = c.req.param("waifuId");

      const deletedVote = await voteService.deleteUserVote(userId, waifuId);

      if (!deletedVote) {
        return c.json({ error: "Voto no encontrado" }, 404);
      }

      return c.json({ message: "Voto eliminado exitosamente" });
    }
  );
