import express from "express";
import { prisma } from "../db/prisma.js";
import { getIncrementLevel } from "../utils/increment.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const holdings = await prisma.holding.findMany({
    include: { member: true, stock: true }
  });

  const formatted = holdings.map(h => {
  const totalBBs = Math.floor(h.shares / h.stock.sharesPerBB);
  const effectiveShares = Math.max(0, h.shares - (h.personalShares || 0));
const effectiveBBs = Math.floor(effectiveShares / h.stock.sharesPerBB);
  const incrementLevel = getIncrementLevel(effectiveBBs);
    return {
      id: h.id,
      member: h.member.name,
      stock: h.stock.symbol,
      shares: h.shares,
      totalBBs,
      incrementLevel,
      personalShares: h.personalShares,
    };
  });

  res.json(formatted);
});

router.post("/", async (req, res) => {
  const { member, symbol, shares, personalShares } = req.body;

  const memberRecord = await prisma.member.findUnique({ where: { name: member }});
  const stockRecord = await prisma.stockConfig.findUnique({ where: { symbol }});

  if (!memberRecord || !stockRecord)
    return res.status(404).json({ error: "Invalid member or stock" });

await prisma.holding.upsert({
  where: {
    memberId_stockId: {
      memberId: memberRecord.id,
      stockId: stockRecord.id
    }
  },
  update: {
    shares,
    personalShares: Number(personalShares || 0)
  },
  create: {
    memberId: memberRecord.id,
    stockId: stockRecord.id,
    shares,
    personalShares: Number(personalShares || 0)
  }
});

  res.json({ success: true });
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  await prisma.holding.delete({
    where: { id }
  });

  res.json({ success: true });
});

export default router;