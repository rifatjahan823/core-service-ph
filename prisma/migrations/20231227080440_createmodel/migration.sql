-- CreateTable
CREATE TABLE "courses" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "credits" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseToPrerequiset" (
    "couseId" TEXT NOT NULL,
    "prerequisetId" TEXT NOT NULL,

    CONSTRAINT "CourseToPrerequiset_pkey" PRIMARY KEY ("couseId","prerequisetId")
);

-- AddForeignKey
ALTER TABLE "CourseToPrerequiset" ADD CONSTRAINT "CourseToPrerequiset_couseId_fkey" FOREIGN KEY ("couseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseToPrerequiset" ADD CONSTRAINT "CourseToPrerequiset_prerequisetId_fkey" FOREIGN KEY ("prerequisetId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
