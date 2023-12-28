import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidation } from './student.validations';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.get('/',StudentController.getAllFromDB);

router.get('/:id',StudentController.getByIdFromDB);

router.patch('/:id',validateRequest(StudentValidation.update),StudentController.updateStudent);

router.delete('/:id',StudentController.deleteStudent);

router.post('/',auth(ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.ADMIN), validateRequest(StudentValidation.create),StudentController.insertIntoDB);



export const studentRoutes = router;