import studentsModel from "./models/students.js";

export default class StudentServiceMongo {
    constructor() {
        console.log("Working students with Database persistence in mongodb");
    }

    getAll = async () => {
        let students = await studentsModel.find();
        return students.map(student => student.toObject());
    }
    save = async (student) => {
        let result = await studentsModel.create(student);
        return result;
    }

    findByUsername = async (username) => {
        const result = await studentsModel.findOne({ email: username });
        return result;
    };

    update = async (filter, value) => {
        console.log("Update student with filter and value:");
        console.log(filter);
        console.log(value);
        let result = await studentsModel.updateOne(filter, value);
        return result;
    }
    getById = async (id) => {
        let student = await studentsModel.findById(id);
        return student ? student.toObject() : null;
    }
    delete = async (id) => {
        let result = await studentsModel.deleteOne({ _id: id });
        return result.deletedCount > 0;
    }
}