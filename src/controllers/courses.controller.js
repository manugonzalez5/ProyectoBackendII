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
        res.status(201).send(result);
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
        let result = await coursesService.update(courseId, req.body);
        if (!result) {
            return res.status(404).send({ message: "Curso no encontrado." });
        }
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo actualizar el curso." });
    }
}

export async function deleteCourse(req, res) {
    try {
        const courseId = req.params.id;
        let result = await coursesService.delete(courseId);
        if (!result) {
            return res.status(404).send({ message: "Curso no encontrado." });
        }
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo eliminar el curso." });
    }
}