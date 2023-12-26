import express from 'express';
import { AcademicDepartmentController } from './academicDepartment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
const router=express.Router();


router.post('/',validateRequest(AcademicDepartmentValidation.create),AcademicDepartmentController.createAcademicDepartment)

router.get('/',AcademicDepartmentController.getAllDepartment)

router.get('/:id',AcademicDepartmentController.getAllDepartment)


export const academicDepartmentRouter=router