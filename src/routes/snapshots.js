import express from "express";
import { prisma } from "../db/prisma.js";
import { calculateProjections } from "../services/projections.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const projections = await calculateProjections();
  const monthKey = new Date().toISOString().slice(0, 7);

  for (const type in projections.total) {
    const row = projections.total[type];

    await prisma.monthlySnapshot.create({
      data: {
        month: monthKey,
        payoutType: type,
        expected: row.expected,
        adjustments: row.adjustments,
        shouldHave: row.shouldHave,
      }
    });
  }

  res.json({ success: true, month: monthKey });
});

router.get("/", async (req, res) => {
  res.json(await prisma.monthlySnapshot.findMany({
    orderBy: { createdAt: "desc" }
  }));
});

export default router;