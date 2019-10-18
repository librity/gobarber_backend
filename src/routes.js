import { Router } from "express";

const routes = new Router();

routes.get("/", (req, res) => {
  return res.json({ message: "you're gay" });
});

module.exports = routes;
