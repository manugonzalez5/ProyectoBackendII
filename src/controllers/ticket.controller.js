import { ticketService } from "../services/service";
import TicketsDto from "../services/dto/ticket.dto.js";

export async function getAllTickets(req, res) {
    try {
        let tickets = await ticketService.getAll();
        res.send(tickets);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo obtener los tickets." });
    }
}

export async function saveTicket(req, res) {
    try {
        const ticketDto = new TicketsDto(req.body); // Antes paso por el DTO y moldeo la info
        let result = await ticketService.save(ticketDto);
        res.status(201).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo guardar el ticket." });
    }
}

export async function getTicketById(req, res) {
    try {
        const ticketId = req.params.id;
        let ticket = await ticketService.getById(ticketId);
        if (!ticket) {
            return res.status(404).send({ message: "Ticket no encontrado." });
        }
        res.send(ticket);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo obtener el ticket." });
    }
}

export async function updateTicket(req, res) {
    try {
        const ticketId = req.params.id;
        const ticketDto = new TicketsDto(req.body); // Antes paso por el DTO y moldeo la info
        let result = await ticketService.update(ticketId, ticketDto);
        if (!result) {
            return res.status(404).send({ message: "Ticket no encontrado." });
        }
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo actualizar el ticket." });
    }
}

export async function deleteTicket(req, res) {
    try {
        const ticketId = req.params.id;
        let result = await ticketService.delete(ticketId);
        if (!result) {
            return res.status(404).send({ message: "Ticket no encontrado." });
        }
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo eliminar el ticket." });
    }
}

