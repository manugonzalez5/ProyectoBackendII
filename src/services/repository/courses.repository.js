export default class CoursesRepository {
    constructor(dao) {
        this.dao = dao;
    }
    getAll = () => {
        return this.dao.getAll();
    }
    save = (course) => {
        return this.dao.save(course);
    }
    update = (filter, value) => {
        return this.dao.update(filter, value);
    }
    getById = (id) => {
        return this.dao.getById(id);
    }
    delete = (id) => {
        return this.dao.delete(id);
    }
};