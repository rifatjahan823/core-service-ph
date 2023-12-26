import express from 'express';
import { academicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterValidation } from './academicSemester.validation';
const route =express.Router()


route.get('/',academicSemesterController.getAllSemester)

route.get('/:id',academicSemesterController.getSingleSemester)

route.delete('/:id',academicSemesterController.deleteSemester)

route.patch('/',validateRequest(academicSemesterValidation.update),academicSemesterController.updateSemester)

route.post('/',validateRequest(academicSemesterValidation.create),academicSemesterController.createSemester)


export const academicSemesterRouter=route

