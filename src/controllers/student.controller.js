import { studentService } from '../services/service.js';
import StudentsDto from '../services/dto/student.dto.js';

export async function getAllStudents(req, res) {
    try {
        let students = await studentService.getAll();
        res.send(students);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo obtener los estudiantes." });
    }
}


export async function saveStudent(req, res) {
    try {
        const { first_name, last_name, email, age, password } = req.body;

        // Validaciones 
        if (!first_name || !last_name || !email || !age || !password) {
            return res.status(400).send({
                message: "Todos los campos son obligatorios: first_name, last_name, email, age y password."
            });
        }

        //  Validaciones específicas
        if (typeof first_name !== 'string' || typeof last_name !== 'string') {
            return res.status(400).send({ message: "first_name y last_name deben ser textos." });
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).send({ message: "El email no tiene un formato válido." });
        }

        if (isNaN(age) || age < 0 ) {
            return res.status(400).send({ message: "La edad debe ser un número válido" });
        }

        if (password.length < 6) {
            return res.status(400).send({ message: "La contraseña debe tener al menos 6 caracteres." });
        }

        // ✅ Crear DTO y guardar
        const studentDto = new StudentsDto(req.body);
        let result = await studentService.save(studentDto);
        res.status(201).send(result);

    } catch (error) {
        console.error(error);
        res.status(500).send({
            error: error.message || error,
            message: "No se pudo guardar el estudiante."
        });
    }
}

export async function getStudentById(req, res) {
    try {
        const studentId = req.params.id;
        let student = await studentService.getById(studentId);
        if (!student) {
            return res.status(404).send({ message: "Estudiante no encontrado." });
        }
        res.send(student);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo obtener el estudiante." });
    }
}

export async function updateStudent(req, res) {
    try {
        const studentId = req.params.id;
        const studentDto = new StudentsDto(req.body); // Antes paso por el DTO y moldeo la info
        let result = await studentService.update(studentId, studentDto);
        if (!result) {
            return res.status(404).send({ message: "Estudiante no encontrado." });
        }
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo actualizar el estudiante." });
    }
}

export async function deleteStudent(req, res) {
    try {
        const studentId = req.params.id;
        let result = await studentService.delete(studentId);
        if (!result) {
            return res.status(404).send({ message: "Estudiante no encontrado." });
        }
        res.send({ message: "Estudiante eliminado exitosamente." });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo eliminar el estudiante." });
    }
}