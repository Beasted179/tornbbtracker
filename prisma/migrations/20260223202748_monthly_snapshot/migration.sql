-- CreateTable
CREATE TABLE "MonthlySnapshot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "month" TEXT NOT NULL,
    "payoutType" TEXT NOT NULL,
    "expected" INTEGER NOT NULL,
    "adjustments" INTEGER NOT NULL,
    "shouldHave" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
