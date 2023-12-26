import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicFacultyFilterableFields } from './academicFaculty.constants';
import { AcademicFacultyService } from './academicFaculty.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await AcademicFacultyService.insertIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'AcademicFaculty created successfully',
        data: result
    });
})

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, academicFacultyFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await AcademicFacultyService.getAllFromDB(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'AcademicFaculties fetched successfully',
        meta: result.meta,
        data: result.data
    });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AcademicFacultyService.getByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'AcademicFaculty fetched successfully',
        data: result
    });
})

// *************update****************
const updateFaculty= catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload=req.body
    const result = await AcademicFacultyService.updateFaculty(id,payload);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'updates AcademicFaculty successfully',
        data: result
    });
})

// ************* deleteFaculty****************
const  deleteFaculty= catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AcademicFacultyService.deleteFaculty(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Delete AcademicFaculty successfully',
        data: result
    });
})



export const AcademicFacultyController = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateFaculty,
    deleteFaculty
};