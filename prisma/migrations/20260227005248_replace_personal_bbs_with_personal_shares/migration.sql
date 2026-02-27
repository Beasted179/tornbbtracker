/*
  Warnings:

  - You are about to drop the column `personalBBs` on the `Holding` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Holding" DROP COLUMN "personalBBs",
ADD COLUMN     "personalShares" INTEGER NOT NULL DEFAULT 0;
