import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { CourseService } from "./course.service";
import { Request, Response } from "express";
import { courseFilterableFields } from "./course.constants";
import pick from "../../../shared/pick";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await CourseService.insertIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course created successfully',
        data: result
    });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, courseFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await CourseService.getAllFromDB(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course fetched successfully',
        meta: result.meta,
        data: result.data
    });
});
const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CourseService.getByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course fetched successfully',
        data: result
    });
})

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CourseService.updateOneInDB(id,req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course updated successfully',
        data: result
    });
})


const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CourseService.deleteByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course deleted successfully',
        data: result
    });
})


// ***************CourseFaculty***************
const assignFaculties = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CourseService.assignFaculties(id,req.body.faculties);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: ' AssignFaculties successfully',
        data: result
    });
})

// **********remove-faculties*************
const removeFaculties = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CourseService.removeFaculties(id,req.body.faculties);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculties Remove successfully',
        data: result
    });
})



export const CourseController={
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateOneInDB,
    deleteByIdFromDB,
    assignFaculties,
    removeFaculties
}