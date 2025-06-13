import { ticketModel } from "./models/ticket.js";

export default class TicketServiceMongo {
    constructor() {
        console.log("Working tickets with Database persistence in mongodb");
    }

    getAll = async () => {
        let tickets = await ticketModel.find();
        return tickets.map(ticket => ticket.toObject());
    }

    save = async (ticket) => {
        let result = await ticketModel.create(ticket);
        return result;
    }

    findByCode = async (code) => {
        const result = await ticketModel.findOne({ code });
        return result;
    };

    update = async (filter, value) => {
        console.log("Update ticket with filter and value:");
        console.log(filter);
        console.log(value);
        let result = await ticketModel.updateOne(filter, value);
        return result;
    }
}