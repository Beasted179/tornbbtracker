import express from "express";
import { prisma } from "../db/prisma.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const entries = await prisma.ledgerEntry.findMany({
    orderBy: { createdAt: "desc" }
  });
  res.json(entries);
});

router.post("/", async (req, res) => {
  const { payoutType, delta, category, note } = req.body;

  if (!payoutType || typeof delta !== "number")
    return res.status(400).json({ error: "Invalid ledger data" });

  const entry = await prisma.ledgerEntry.create({
    data: { payoutType, delta, category, note: note || null }
  });

  res.json(entry);
});

export default router;