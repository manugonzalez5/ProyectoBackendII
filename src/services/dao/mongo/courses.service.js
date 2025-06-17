import { coursesModel } from "./models/courses.js";

export default class CourseServiceMongo {
    constructor() {
        console.log("Working courses with Database persistence in mongodb");
    }

    getAll = async () => {
        let courses = await coursesModel.find();
        return courses.map(course => course.toObject());
    }
    save = async (course) => {
        let result = await coursesModel.create(course);
        return result;
    }
    update = async (filter, value) => {
        console.log("Update course with filter and value:");
        console.log(filter);
        console.log(value);
        let result = await coursesModel.updateOne(filter, value);
        return result;
    }
    getById = async (id) => {
        let course = await coursesModel.findById(id);
        return course ? course.toObject() : null;
    }
    delete = async (id) => {
        let result = await coursesModel.deleteOne({ _id: id });
        return result.deletedCount > 0;
    }
}