/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Career` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Career_title_key" ON "Career"("title");
