import { Router } from 'express';
import { passportCall, authorization } from '../utils.js';
import CourseServiceMongo from '../services/dao/mongo/courses.service.js';

const router = new Router();
const courseService = new CourseServiceMongo();

/* ================================
=  VISTAS SOLO PARA ADMIN          =
================================= */

// Login admin
router.get('/login', (req, res) => {
    res.render('adminLogin');
});

// Dashboard o listado de cursos (ABM cursos)
router.get('/courses',
    passportCall('jwt'),
    authorization('admin'),
    async (req, res) => {
        // Obtener cursos de tu servicio o modelo
        const courses = await courseService.getAll();
        res.render('adminCourses', {
            user: req.user,
            courses
        });
    }
);

// Crear curso - formulario
router.get('/courses/new',
    passportCall('jwt'),
    authorization('admin'),
    (req, res) => {
        res.render('adminCourseNew');
    }
);

// Opcional: editar curso - formulario
router.get('/courses/edit/:id',
    passportCall('jwt'),
    authorization('admin'),
    async (req, res) => {
        const courseId = req.params.id;
        // Obtener curso por id
        const course = await courseService.getById(courseId);
        res.render('adminCourseEdit', { course });
    }
);

export default router;