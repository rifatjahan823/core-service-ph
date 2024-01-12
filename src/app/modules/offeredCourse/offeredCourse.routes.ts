import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseController } from './offeredCourse.controller';
import { OfferedCourseValidations } from './offeredCourse.validation';

const router = express.Router();

router.get('/', OfferedCourseController.getAllFromDB);
router.get('/:id', OfferedCourseController.getByIdFromDB);

router.post(
    '/',
    validateRequest(OfferedCourseValidations.create),
    OfferedCourseController.insertIntoDB
);

router.patch(
    '/:id',
    validateRequest(OfferedCourseValidations.update),
    OfferedCourseController.updateOneInDB
);

router.delete(
    '/:id',
    OfferedCourseController.deleteByIdFromDB
);

export const offeredCourseRoutes = router;