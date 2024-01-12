import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseClassScheduleController } from './offeredCourseClassSchedule.controller';
import { OfferedCourseClassScheduleValidation } from './offeredCourseClassSchedule.validations';

const router = express.Router();

router.get('/', OfferedCourseClassScheduleController.getAllFromDB);
router.get('/:id', OfferedCourseClassScheduleController.getByIdFromDB);

router.post(
    '/',
    validateRequest(OfferedCourseClassScheduleValidation.create),
    OfferedCourseClassScheduleController.insertIntoDB
);

router.patch(
    '/:id',
    validateRequest(OfferedCourseClassScheduleValidation.update),
    OfferedCourseClassScheduleController.updateOneInDB
);

router.delete(
    '/:id',
    OfferedCourseClassScheduleController.deleteByIdFromDB
);



export const offeredCourseClassScheduleRoutes = router;