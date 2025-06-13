export default class CartsRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getAll = () => {
        return this.dao.getAll();
    }

    save = (cart) => {
        return this.dao.save(cart);
    }

    findById = async (id) => {
        return this.dao.findById(id);
    };

    deleteById = async (id) => {
        return this.dao.deleteById(id);
    };
}