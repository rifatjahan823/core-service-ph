import {Request, Response } from "express";
import { academicSemesterService } from "./academicSemester.service";
import sendResponse from "../../../shared/sendResponse";
import { AcademicSemester } from "@prisma/client";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";

// ****************Create****************
const createSemester=catchAsync(async (req:Request,res:Response)=>{
    const result=await academicSemesterService.createSemester(req.body);
    sendResponse<AcademicSemester>(res,{
        statusCode:httpStatus.OK,
        success: true,
        message:"AcademicSemester Created Successfully",
        data:result
    })
}) 

// *************GetAll***************
const getAllSemester=catchAsync(async(req:Request,res:Response)=>{
    const filter=pick(req.query,['searchTerm','code','startMonth','endMonth']);
    const options=pick(req.query,['limit','page','sortBy','sortOrder']);

const result= await academicSemesterService.getAllSemester(filter,options);
 sendResponse<AcademicSemester>(res,{
    statusCode:httpStatus.OK,
    success: true,
    message:"Get All AcademicSemester Successfully",
    meta:result.meta,
    data:result.data
})
})


// ************getSingleSemester*******************
 const getSingleSemester=catchAsync(async(req:Request,res:Response)=>{
    const result =await academicSemesterService.getSingleSemester(req.params.id);
    sendResponse<AcademicSemester>(res,{
        statusCode:httpStatus.OK,
        success: true,
        message:"Get All AcademicSemester Successfully",
       data: result
    })
 })



export const academicSemesterController={
    createSemester,
    getAllSemester,
    getSingleSemester
}