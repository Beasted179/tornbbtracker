import express from "express";
import { prisma } from "../db/prisma.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await prisma.stockConfig.findMany({
    orderBy: { symbol: "asc" }
  }));
});

export default router;