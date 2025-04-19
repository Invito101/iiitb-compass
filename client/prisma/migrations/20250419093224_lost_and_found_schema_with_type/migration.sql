/*
  Warnings:

  - Added the required column `type` to the `LostAndFound` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LostAndFound" ADD COLUMN     "type" TEXT NOT NULL;
