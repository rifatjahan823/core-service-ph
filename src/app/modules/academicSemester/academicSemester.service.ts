import { AcademicSemester, PrismaClient } from "@prisma/client";
const prisma=new PrismaClient()

const createSemester=async (data:AcademicSemester):Promise<AcademicSemester> => {
    const result=await prisma.academicSemester.create({data});
    return result
}


export const academicSemesterService={
    createSemester
}