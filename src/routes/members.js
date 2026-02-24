import express from "express";
import { prisma } from "../db/prisma.js";

const router = express.Router();
router.post("/", async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name required" });

  const member = await prisma.member.create({
    data: { name }
  });

  res.json(member);
});

router.delete("/:id", async (req, res) => {
  await prisma.member.delete({
    where: { id: Number(req.params.id) }
  });

  res.json({ success: true });
});
router.get("/", async (req, res) => {
  res.json(await prisma.member.findMany({
    orderBy: { name: "asc" }
  }));
});

export default router;