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
// ***************************
router.post(
    '/start-registration',
    SemesterRegistrationController.startMyRegistration
)
router.get(
    '/get-my-registration',
    SemesterRegistrationController.getMyRegistration
)
router.post(
    '/enroll-into-course',
    validateRequest(SemesterRegistrationValidation.enrollOrWithdrawCourse),
    SemesterRegistrationController.enrollIntoCourse
)

router.post(
    '/withdraw-from-course',
    validateRequest(SemesterRegistrationValidation.enrollOrWithdrawCourse),
    SemesterRegistrationController.withdrawFromCourse
)
router.post(
    '/confirm-my-registration',
    SemesterRegistrationController.confirmMyRegistration
)
export const semesterRegistrationRoutes = router;