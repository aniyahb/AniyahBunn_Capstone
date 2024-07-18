/*
  Warnings:

  - You are about to drop the column `reatedAt` on the `UserFavoriteRecipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserFavoriteRecipe" DROP COLUMN "reatedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
