import { Router } from 'express';
import * as CoursesController from '../controllers/courses.controller.js'

const router = Router();

router.get('/', CoursesController.getAllCourses)
router.post('/', CoursesController.saveCourse)

export default router;