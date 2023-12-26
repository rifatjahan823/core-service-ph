import express from 'express';
import { academicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterValidation } from './academicSemester.validation';
const route =express.Router()

route.post('/',validateRequest(academicSemesterValidation.create),academicSemesterController.createSemester)

route.get('/',academicSemesterController.getAllSemester)

route.get('/:id',academicSemesterController.getSingleSemester)


export const academicSemesterRouter=route

