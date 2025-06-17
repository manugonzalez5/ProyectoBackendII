import mongoose from 'mongoose';
import { coursesService } from '../services/service.js';

export async function getAllCourses(req, res) {
    try {
        let courses = await coursesService.getAll();
        res.send(courses);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo obtener los cursos." });
    }
}


export async function saveCourse(req, res) {
    try {
        // const studentDto = new StudentsDto(req.body);
        let result = await coursesService.save(req.body);
        res.redirect('/admin/courses');
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo guardar el curso." });
    }
}

export async function getCourseById(req, res) {
    try {
        const courseId = req.params.id;
        let course = await coursesService.getById(courseId);
        if (!course) {
            return res.status(404).send({ message: "Curso no encontrado." });
        }
        res.send(course);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo obtener el curso." });
    }
}


export async function updateCourse(req, res) {
    try {
        const courseId = req.params.id;

        // Validar que el ID sea un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).send({ message: "ID de curso no válido." });
        }

        // Validar que el body no esté vacío
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send({ message: "No se enviaron datos para actualizar." });
        }

        const { title, description, teacherName, students } = req.body;

        // Validar que title sea string no vacío
        if (title !== undefined) {
            if (typeof title !== "string" || title.trim() === "") {
                return res.status(400).send({ message: "El título debe ser una cadena de texto no vacía." });
            }
        }

        // Validar que description sea string no vacío
        if (description !== undefined) {
            if (typeof description !== "string" || description.trim() === "") {
                return res.status(400).send({ message: "La descripción debe ser una cadena de texto no vacía." });
            }
        }

        // Validar que teacherName sea string no vacío
        if (teacherName !== undefined) {
            if (typeof teacherName !== "string" || teacherName.trim() === "") {
                return res.status(400).send({ message: "El nombre del profesor debe ser texto no vacío." });
            }
        }

        const result = await coursesService.update({ _id: courseId }, req.body);

        if (!result || result.matchedCount === 0) {
            return res.status(404).send({ message: "Curso no encontrado." });
        }

        res.redirect('/admin/courses');

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message, message: "No se pudo actualizar el curso." });
    }
}


export async function deleteCourse(req, res) {
    try {
        const courseId = req.params.id;

        // Validar que el ID sea un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).send({ message: "ID de curso no válido." });
        }

        let result = await coursesService.delete(courseId);

        if (!result) {
            return res.status(404).send({ message: "Curso no encontrado." });
        }

        res.redirect('/admin/courses');
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message, message: "No se pudo eliminar el curso." });
    }
}