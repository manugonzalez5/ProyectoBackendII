// Importacion de los DAOs
import StudentServiceDao from "./dao/mongo/students.service.js";
import CoursesServiceDao from "./dao/mongo/courses.service.js";
import TicketServiceDao from "./dao/mongo/ticket.service.js";
import CartsServiceDao from "./dao/mongo/carts.service.js";

// Importacion de un repository
import StudentRepository from './repository/students.repository.js'
import CoursesRepository from './repository/courses.repository.js'
import TicketRepository from './repository/ticket.repository.js'
import CartsRepository from './repository/carts.repository.js'


// Instanciamos las clases
const studentDao = new StudentServiceDao()
const coursesDao = new CoursesServiceDao();
const ticketDao = new TicketServiceDao();
const cartsDao = new CartsServiceDao();


export const studentService = new StudentRepository(studentDao)
export const coursesService = new CoursesRepository(coursesDao)
export const ticketService = new TicketRepository(ticketDao)
export const cartsService = new CartsRepository(cartsDao)
