import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function main() {
  const members = await prisma.member.findMany();
  const stocks = await prisma.stockConfig.findMany();

  const getMember = name => members.find(m => m.name === name);
  const getStock = symbol => stocks.find(s => s.symbol === symbol);

  // EXAMPLE — replace with real spreadsheet values
  const data = [
    {
      member: "MetaG",
      symbol: "FHG",
      shares: 6000000,
    },
    {
      member: "BeerMojo",
      symbol: "SYM",
      shares: 500000,
    },
  ];

  for (const row of data) {
    await prisma.holding.upsert({
      where: {
        memberId_stockId: {
          memberId: getMember(row.member).id,
          stockId: getStock(row.symbol).id,
        },
      },
      update: { shares: row.shares },
      create: {
        memberId: getMember(row.member).id,
        stockId: getStock(row.symbol).id,
        shares: row.shares,
      },
    });
  }

  console.log("Holdings inserted.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());