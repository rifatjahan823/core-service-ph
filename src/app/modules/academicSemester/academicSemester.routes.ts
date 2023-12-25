import express from 'express';
import { academicSemesterController } from './academicSemester.controller';
const route =express.Router()

route.post('/',academicSemesterController.createSemester)


export const academicSemesterRouter=route

