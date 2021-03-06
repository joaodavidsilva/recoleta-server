import express from "express";
import knex from "./database/connection";

const routes = express.Router();

routes.get("/items", async (req, res) => {
  const items = await knex("items").select("*");

  const serializedItems = items.map((item) => {
    return {
      id: item.id,
      title: item.title,
      imageURL: `http://localhost:3333/uploads/${item.image}`,
    };
  });

  return res.json(serializedItems);
});

routes.post("/points", async (req, res) => {
  const {
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    street,
    items,
  } = req.body;

  const trx = await knex.transaction();

  const insertedIds = await trx("points").insert({
    image: "image-fake",
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    street,
  });

  const point_id = insertedIds[0];

  const point_items = items.map((item_id: number) => {
    return {
      item_id,
      point_id,
    };
  });

  await trx("point_items").insert(point_items);

  return res.json({ success: true });
});

export default routes;
