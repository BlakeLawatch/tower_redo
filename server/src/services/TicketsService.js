import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TicketsService {

    async createTicket(ticketInfo) {
        const newTicket = (await dbContext.Ticket.create(ticketInfo)).populate('profile')
        return newTicket
    }

    async getMyTickets(userId) {
        const myTickets = await dbContext.Ticket.find({ accountId: userId }).populate('event')
        return myTickets
    }

    async getEventTickets(eventId) {
        const eventTickets = await dbContext.Ticket.find({ eventId }).populate('profile ticketCount')
        return eventTickets
    }

    async destroyTicket(ticketId, userId) {
        const destroyTicket = await dbContext.Ticket.findById(ticketId)
        if (!destroyTicket) {
            throw new BadRequest('No ticket to delete')
        }
        if (destroyTicket.accountId != userId) {
            throw new Forbidden('Not yours to delete')
        }
        await destroyTicket.delete()
        return `It's over man, move on`
    }
}

export const ticketsService = new TicketsService()