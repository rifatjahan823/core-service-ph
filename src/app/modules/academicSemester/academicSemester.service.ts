import { AcademicSemester, Prisma } from "@prisma/client";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../../interfaces/pagination";
import {  IAcademicSemesterFilter } from "./academicSemester.interface";
import { acdemicSemesterFilterableField } from "./academicSemester.constant";
import prisma from "../../../shared/prisma";



// --------------create------------
const createSemester=async (academicSemesterData:AcademicSemester):Promise<AcademicSemester> => {
    const result=await prisma.academicSemester.create({
        data:academicSemesterData
    });
    return result
}


// ***********get all***************
const getAllSemester=async (filters:IAcademicSemesterFilter,options:IPaginationOptions):Promise<IGenericResponse<AcademicSemester[]>> => {
    const {page,limit,skip}=paginationHelpers.calculatePagination(options)
    const {searchTerm,...filterData}=filters
    const andConditions=[];

    if(searchTerm){
        andConditions.push({
            OR:acdemicSemesterFilterableField.map((field)=>({
                [field]:{
                    contains:searchTerm,mode:"insensitive"
                }
            }))
        })
    }

if(Object.keys(filterData).length>0){
    andConditions.push({
        AND:Object.keys(filterData).map((key)=>({
            [key]:{
                equals:(filterData as any)[key]
            }
        }))
    })
}

    const whereConditions:Prisma.AcademicSemesterWhereInput=andConditions.length>0?{AND:andConditions}:{}

    const result=await prisma.academicSemester.findMany({
        where:whereConditions,
        skip,
        take:limit,
        orderBy:options.sortBy&&options.sortOrder?{
            [ options.sortBy]:options.sortOrder
         }:{
            createdAt:"desc"
         }
    });

    const total=await prisma.academicSemester.count()
    return {
        meta:{
        total,
        page,
        limit,
    },
    data:result
}
}

// *************getSingleData*********************
const getSingleSemester=async (id:string):Promise<AcademicSemester|null> => {
    const result=prisma.academicSemester.findUnique({
        where:{
            id
        }
    });
    return result
}



export const academicSemesterService={
    createSemester,
    getAllSemester,
    getSingleSemester
}