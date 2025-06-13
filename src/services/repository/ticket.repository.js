export default class TicketRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getAll = () => {
        return this.dao.getAll();
    }

    save = (ticket) => {
        return this.dao.save(ticket);
    }

    findByCode = async (code) => {
        return this.dao.findByCode(code);
    };

    deleteById = async (id) => {
        return this.dao.deleteById(id);
    };
}