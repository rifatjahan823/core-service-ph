import express from 'express';
import { academicSemesterRouter } from '../modules/academicSemester/academicSemester.routes';
import { studentRoutes } from '../modules/student/student.routes';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes';
import { academicDepartmentRouter } from '../modules/academicDepartment/academicDepartment.routes';
import { buildingRoutes } from '../modules/building/building.routes';
import { roomRoutes } from '../modules/room/room.routes';
import { facultyRoutes } from '../modules/faculty/faculty.routes';
import { courseRoutes } from '../modules/course/course.routes';
import { semesterRegistrationRoutes } from '../modules/semesterRegistration/semesterRegistration.routes';
import { offeredCourseRoutes } from '../modules/offeredCourse/offeredCourse.routes';
import { offeredCourseSectionRoutes } from '../modules/offeredCourseSection/offeredCourseSection.routes';
import { offeredCourseClassScheduleRoutes } from '../modules/offeredCourseClassSchedule/offeredCourseClassSchedule.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: "/academic-semester",
    route: academicSemesterRouter
  },
  {
    path: "/students",
    route: studentRoutes
  },
  {
    path: '/academic-faculties',
    route: academicFacultyRoutes
  },
  {
    path: '/academic-departments',
    route: academicDepartmentRouter
  },
  {
    path: '/buildings',
    route: buildingRoutes
  },
  {
    path: '/rooms',
    route: roomRoutes
  },
  {
    path: '/faculties',
    route: facultyRoutes
  },
  {
    path: '/courses',
    route: courseRoutes
  },
  {
    path: '/semester-registration',
    route: semesterRegistrationRoutes
  }, {
    path: '/offered-courses',
    route: offeredCourseRoutes
  },
  {
    path: '/offered-course-sections',
    route: offeredCourseSectionRoutes
  },
  {
    path: '/offered-course-class-schedules',
    route: offeredCourseClassScheduleRoutes
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
