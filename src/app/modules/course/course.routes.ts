import express from 'express';
import { CourseController } from './course.controller';


const router = express.Router();

router.get('/', CourseController.getAllFromDB);
router.get('/:id', CourseController.getByIdFromDB);
router.get('/:id', CourseController.updateOneInDB);
router.delete('/:id', CourseController.deleteByIdFromDB);


router.post('/',CourseController.insertIntoDB);

router.post('/:id/assign-faculites',CourseController.assignFaculties);
router.delete('/:id/remove-faculites',CourseController.removeFaculties);

export const courseRoutes = router;