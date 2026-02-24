import express from "express";
import { calculateProjections } from "../services/projections.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const data = await calculateProjections();
  res.json(data);
});

export default router;  