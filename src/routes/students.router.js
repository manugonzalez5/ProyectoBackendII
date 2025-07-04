import { Router } from 'express';
import * as StudentController from '../controllers/student.controller.js'

const router = Router();


router.get('/', StudentController.getAllStudents);
router.post('/', StudentController.saveStudent);


export default router;