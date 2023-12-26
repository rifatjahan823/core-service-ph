-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_academicSemesterId_fkey";

-- AlterTable
ALTER TABLE "students" ALTER COLUMN "contactNo" SET DATA TYPE TEXT;
