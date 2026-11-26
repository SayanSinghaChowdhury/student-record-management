/*
  Warnings:

  - You are about to drop the column `Commerce` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `Science` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `arts` on the `Category` table. All the data in the column will be lost.
  - Added the required column `streams` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "streams" TEXT NOT NULL,
    "teacherId" TEXT,
    CONSTRAINT "Category_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Category" ("id", "teacherId") SELECT "id", "teacherId" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
