import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AcademicDepartmentService } from "./academicDepartment.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { academicDepartmentFilterableFields } from "./academicDepartment.contants";

// **************Create-Department************
const createAcademicDepartment=catchAsync(async (req:Request,res:Response) => {
    const result =await AcademicDepartmentService.createAcademicDepartment(req.body);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Create Academic Department Successfully",
        data:result
    })
})


// ********************getAllDepartment*******************
const getAllDepartment=catchAsync(async (req:Request,res:Response) => {
    const filters = pick(req.query, academicDepartmentFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await AcademicDepartmentService.getAllDepartment(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'AcademicDepartments fetched successfully',
        meta: result.meta,
        data: result.data
    });
})

// ****************SingleData*****************
const getSingleDepartment=catchAsync(async (req:Request,res:Response) => {
    const result = await AcademicDepartmentService.getSingleDepartment(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'AcademicDepartments fetched successfully',
        data: result
    });
})


export const AcademicDepartmentController={
    createAcademicDepartment,
    getAllDepartment,
    getSingleDepartment
}