import { prisma } from "../db/prisma.js";
import { getIncrementLevel } from "../utils/increment.js";

export async function calculateProjections() {
  const now = new Date();
  const trackingStartDate = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    1,
    0, 0, 0
  ));

  const holdings = await prisma.holding.findMany({
    include: { stock: true }
  });

  const result = {
    stocks: {},
    payoutTypes: {},
    total: {}
  };

  for (const h of holdings) {
    const { stock, shares } = h;

   const totalBBs = Math.floor(shares / stock.sharesPerBB);
   const effectiveBBs = Math.max(0, totalBBs - h.personalBBs);
   const incrementLevel = getIncrementLevel(effectiveBBs);
    if (incrementLevel === 0) continue;

    const daysSinceStart =
      (now - trackingStartDate) / (1000 * 60 * 60 * 24);

    const cyclesPassed = Math.max(
      0,
      Math.floor(daysSinceStart / stock.payoutIntervalDays)
    );

    const expected =
      incrementLevel * stock.payoutAmount * cyclesPassed;

    result.payoutTypes[stock.payoutType] =
      (result.payoutTypes[stock.payoutType] || 0) + expected;
  }

  const ledger = await prisma.ledgerEntry.findMany();

  const adjustments = {};
  for (const entry of ledger) {
    adjustments[entry.payoutType] =
      (adjustments[entry.payoutType] || 0) + entry.delta;
  }

  for (const type in result.payoutTypes) {
    const expected = result.payoutTypes[type];
    result.total[type] = {
      expected,
      adjustments: adjustments[type] || 0,
      shouldHave: expected + (adjustments[type] || 0)
    };
  }

  return result;
}