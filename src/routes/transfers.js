router.post("/", async (req, res) => {
  const { fromMemberId, toMemberId, stockId, shares } = req.body;

  if (!fromMemberId || !toMemberId || !stockId || typeof shares !== "number")
    return res.status(400).json({ error: "Invalid data" });

  await prisma.$transaction(async (tx) => {
    const fromHolding = await tx.holding.findUnique({
      where: {
        memberId_stockId: { memberId: fromMemberId, stockId }
      }
    });

    if (!fromHolding || fromHolding.shares < shares)
      throw new Error("Insufficient shares");

    // subtract
    await tx.holding.update({
      where: {
        memberId_stockId: { memberId: fromMemberId, stockId }
      },
      data: { shares: { decrement: shares } }
    });

    // add to recipient (create if not exists)
    await tx.holding.upsert({
      where: {
        memberId_stockId: { memberId: toMemberId, stockId }
      },
      update: { shares: { increment: shares } },
      create: {
        memberId: toMemberId,
        stockId,
        shares
      }
    });
  });

  res.json({ success: true });
});