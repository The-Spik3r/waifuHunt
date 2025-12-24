import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import { validator as zValidator } from "hono-openapi/zod";
import { CreateWaifuBody, UpdateWaifuBody } from "./validation";

export const waifuRoute = new Hono()
  .get(
    "/",
    describeRoute({
      tags: ["Waifus"],
      description: "Obtener todas las waifus con paginación",
    }),
    async (c) => {
      const { waifuService } = c.get("dependencies");
      const limit = Number(c.req.query("limit")) || 100;
      const offset = Number(c.req.query("offset")) || 0;

      const waifus = await waifuService.getAll(limit, offset);
      const total = await waifuService.count();

      return c.json({
        data: waifus,
        pagination: {
          limit,
          offset,
          total,
        },
      });
    }
  )
  .post(
    "/",
    zValidator("json", CreateWaifuBody),
    describeRoute({
      tags: ["Waifus"],
      description: "Crear una nueva waifu",
    }),
    async (c) => {
      const { waifuService } = c.get("dependencies");
      const body = c.req.valid("json");
      const newWaifu = await waifuService.create(body);
      return c.json(newWaifu, 201);
    }
  )
  .get(
    "/search",
    describeRoute({
      tags: ["Waifus"],
      description: "Buscar waifus por nombre",
    }),
    async (c) => {
      const { waifuService } = c.get("dependencies");
      const query = c.req.query("q") || "";
      const limit = Number(c.req.query("limit")) || 20;

      const waifus = await waifuService.searchByName(query, limit);
      return c.json(waifus);
    }
  )
  .get(
    "/source/:source",
    describeRoute({
      tags: ["Waifus"],
      description: "Obtener waifus por fuente (anime/manga/manhwa)",
    }),
    async (c) => {
      const { waifuService } = c.get("dependencies");
      const source = c.req.param("source");
      const limit = Number(c.req.query("limit")) || 50;
      const offset = Number(c.req.query("offset")) || 0;

      const waifus = await waifuService.getBySource(source, limit, offset);
      return c.json(waifus);
    }
  )
  .get(
    "/:id",
    describeRoute({
      tags: ["Waifus"],
      description: "Obtener una waifu por ID",
    }),
    async (c) => {
      const { waifuService } = c.get("dependencies");
      const id = c.req.param("id");
      const waifu = await waifuService.getById(id);

      if (!waifu) {
        return c.json({ error: "Waifu no encontrada" }, 404);
      }

      return c.json(waifu);
    }
  )
  .get(
    "/slug/:slug",
    describeRoute({
      tags: ["Waifus"],
      description: "Obtener una waifu por slug",
    }),
    async (c) => {
      const { waifuService } = c.get("dependencies");
      const slug = c.req.param("slug");
      const waifu = await waifuService.getBySlug(slug);

      if (!waifu) {
        return c.json({ error: "Waifu no encontrada" }, 404);
      }

      return c.json(waifu);
    }
  )
  .patch(
    "/:id",
    zValidator("json", UpdateWaifuBody),
    describeRoute({
      tags: ["Waifus"],
      description: "Actualizar una waifu",
    }),
    async (c) => {
      const { waifuService } = c.get("dependencies");
      const id = c.req.param("id");
      const body = c.req.valid("json");

      const updatedWaifu = await waifuService.update(id, body);

      if (!updatedWaifu) {
        return c.json({ error: "Waifu no encontrada" }, 404);
      }

      return c.json(updatedWaifu);
    }
  )
  .delete(
    "/:id",
    describeRoute({
      tags: ["Waifus"],
      description: "Eliminar una waifu",
    }),
    async (c) => {
      const { waifuService } = c.get("dependencies");
      const id = c.req.param("id");

      const deletedWaifu = await waifuService.deleteById(id);

      if (!deletedWaifu) {
        return c.json({ error: "Waifu no encontrada" }, 404);
      }

      return c.json({ message: "Waifu eliminada exitosamente" });
    }
  );
