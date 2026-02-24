import express from "express";
import { prisma } from "../db/prisma.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const audits = await prisma.auditSnapshot.findMany({
    orderBy: { createdAt: "desc" }
  });
  res.json(audits);
});

router.post("/", async (req, res) => {
  const { payoutType, actual, note } = req.body;

  if (!payoutType || typeof actual !== "number")
    return res.status(400).json({ error: "Invalid audit data" });

  const snapshot = await prisma.auditSnapshot.create({
    data: { payoutType, actual, note: note || null }
  });

  res.json(snapshot);
});

export default router;