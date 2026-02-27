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

  const ledger = await prisma.ledgerEntry.findMany();

  const result = {
    payoutTypes: {},
    total: {}
  };

  for (const h of holdings) {
    const shares = h.shares || 0;
    const personalBBs = h.personalBBs ?? 0;
    const stock = h.stock;

    if (!stock) continue;



const personalShares = h.personalShares || 0;

const effectiveShares = Math.max(0, shares - personalShares);

const effectiveBBs = Math.floor(
  effectiveShares / stock.sharesPerBB
);

const incrementLevel = getIncrementLevel(effectiveBBs);
    if (incrementLevel <= 0) continue;


    const daysSinceStart =
      (now - trackingStartDate) / (1000 * 60 * 60 * 24);

    const cyclesPassed = Math.floor(
      daysSinceStart / stock.payoutIntervalDays
    );

    if (cyclesPassed <= 0) continue;

    const expected =
      incrementLevel * stock.payoutAmount * cyclesPassed;

    result.payoutTypes[stock.payoutType] =
      (result.payoutTypes[stock.payoutType] || 0) + expected;
  }


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