import { AppState } from "../AppState"
import { Ticket } from "../models/Ticket"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TicketsService{


    async buyTicket(eventId){
        const eventData = {eventId: eventId}
        const res = await api.post(`api/tickets`, eventData)
        AppState.tickets.push(new Ticket(res.data))
        
    }

    async getEventTickets(eventId){
        const res = await api.get(`api/events/${eventId}/tickets`)
        AppState.tickets = res.data.map(pojo => new Ticket(pojo))
        logger.log('Got pojoless tickets', AppState.tickets)
    }

    async getAccountTickets(){
        const res = await api.get(`account/tickets`)
        logger.log('got tickets FINISH IN THE SERVICE', res.data)
    }
}

export const ticketsService = new TicketsService()