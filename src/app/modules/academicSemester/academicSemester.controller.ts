import { NextFunction, Request, Response } from "express";
import { academicSemesterService } from "./academicSemester.service";
import sendResponse from "../../../shared/sendResponse";
import { AcademicSemester } from "@prisma/client";
import httpStatus from "http-status";


const createSemester=async (req:Request,res:Response,next:NextFunction) => {
    try{
        const result=await academicSemesterService.createSemester(req.body)
    sendResponse<AcademicSemester>(res,{
        statusCode:httpStatus.OK,
        success: true,
        message:"AcademicSemester Created Successfully",
        data:result
    })
    }catch(error){
       next(error)
    }
}


export const academicSemesterController={
    createSemester
}