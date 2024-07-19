/*
  Warnings:

  - A unique constraint covering the columns `[spoonacularId]` on the table `Recipe` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `spoonacularId` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "spoonacularId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_spoonacularId_key" ON "Recipe"("spoonacularId");
