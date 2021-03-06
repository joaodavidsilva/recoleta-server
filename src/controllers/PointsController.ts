import { Request, Response } from "express";
import knex from "../database/connection";

class PointsController {
  async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      street,
      items,
    } = request.body;

    const trx = await knex.transaction();

    const point = {
      image: "image-fake",
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      street,
    };

    const insertedIds = await trx("points").insert(point);

    const point_id = insertedIds[0];
    const point_items = items.map((item_id: number) => {
      return {
        item_id,
        point_id,
      };
    });

    await trx("point_items").insert(point_items);

    return response.json({
        id: point_id,
        ...point,
    });
  }
}

export default PointsController;
