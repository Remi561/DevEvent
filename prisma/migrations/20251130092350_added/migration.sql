/*
  Warnings:

  - Added the required column `audience` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mode` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "audience" TEXT NOT NULL,
ADD COLUMN     "mode" TEXT NOT NULL;
