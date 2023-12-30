import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import { SemesterRegistrationValidation } from './semesterRegistration.validations';

const router = express.Router();

router.get('/', SemesterRegistrationController.getAllFromDB);
router.get('/:id', SemesterRegistrationController.getByIdFromDB);

router.post(
    '/',
    validateRequest(SemesterRegistrationValidation.create),
    SemesterRegistrationController.insertIntoDB
);
router.patch(
    '/:id',
    validateRequest(SemesterRegistrationValidation.update),
    SemesterRegistrationController.updateOneInDB
);

router.delete(
    '/:id',
    SemesterRegistrationController.deleteByIdFromDB
);

export const semesterRegistrationRoutes = router;