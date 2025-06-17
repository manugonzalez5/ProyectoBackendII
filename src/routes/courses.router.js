import { Router } from 'express';
import * as CoursesController from '../controllers/courses.controller.js'

const router = Router();

router.get('/', CoursesController.getAllCourses)
router.post('/', CoursesController.saveCourse)
router.get('/:id', CoursesController.getCourseById)
router.put('/:id', CoursesController.updateCourse)
router.delete('/:id', CoursesController.deleteCourse)
export default router;