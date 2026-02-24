import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function main() {
  const trackingStartDate = new Date("2026-03-01T00:00:00Z");

  // Store global start date
  await prisma.setting.upsert({
    where: { key: "trackingStartDate" },
    update: { value: trackingStartDate.toISOString() },
    create: {
      key: "trackingStartDate",
      value: trackingStartDate.toISOString(),
    },
  });

  // ---- STOCK CONFIGS ----
  const stocks = [
    {
      symbol: "FHG",
      name: "Feathery Hotels Group",
      sharesPerBB: 2000000,
      payoutType: "FHC",
      payoutAmount: 1,
      payoutIntervalDays: 7,
    },
    {
      symbol: "SYM",
      name: "Symbiotic Ltd.",
      sharesPerBB: 500000,
      payoutType: "Drug Pack",
      payoutAmount: 1,
      payoutIntervalDays: 7,
    },
    {
      symbol: "MUN",
      name: "Munster Beverage Corp.",
      sharesPerBB: 5000000,
      payoutType: "Six Pack Energy",
      payoutAmount: 1,
      payoutIntervalDays: 7,
    },
    {
      symbol: "TMI",
      name: "Torn Music Industries",
      sharesPerBB: 6000000,
      payoutType: "Money",
      payoutAmount: 25000000,
      payoutIntervalDays: 31,
    },
    {
      symbol: "TCT",
      name: "Torn City Times",
      sharesPerBB: 100000,
      payoutType: "Money",
      payoutAmount: 1000000,
      payoutIntervalDays: 31,
    },
    {
      symbol: "IOU",
      name: "Insured On Us",
      sharesPerBB: 3000000,
      payoutType: "Money",
      payoutAmount: 12000000,
      payoutIntervalDays: 31,
    },
    {
      symbol: "LAG",
      name: "Legal Authorities Group",
      sharesPerBB: 750000,
      payoutType: "Lawyer Card",
      payoutAmount: 1,
      payoutIntervalDays: 7,
    },
  ];

  for (const stock of stocks) {
    await prisma.stockConfig.upsert({
      where: { symbol: stock.symbol },
      update: {},
      create: stock,
    });
  }

  // ---- MEMBERS ----
  const members = [
    "MetaG",
    "Nerudamann",
    "fluffis",
    "BeerMojo",
    "Czechingout",
  ];

  for (const name of members) {
    await prisma.member.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log("Seed complete.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());