import express from "express";

import holdingsRoutes from "./routes/holdings.js";
import ledgerRoutes from "./routes/ledger.js";
import auditRoutes from "./routes/audits.js";
import memberRoutes from "./routes/members.js";
import stockRoutes from "./routes/stocks.js";
import snapshotRoutes from "./routes/snapshots.js";
import projectionRoutes from "./routes/projections.js";

import { dashboardHTML } from "./ui/dashboard.js";

const app = express();
app.use(express.json());
app.use(express.static("src/ui"));

app.use("/holdings", holdingsRoutes);
app.use("/ledger", ledgerRoutes);
app.use("/audits", auditRoutes);
app.use("/members", memberRoutes);
app.use("/stocks", stockRoutes);
app.use("/snapshots", snapshotRoutes);
app.use("/projections", projectionRoutes);

app.get("/", (req, res) => {
  res.send(dashboardHTML());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});