import { AppState } from "../AppState"
import { Ticket } from "../models/Ticket"
import { api } from "./AxiosService"

class TicketsService{


    async buyTicket(eventId){
        const eventData = {eventId: eventId}
        const res = await api.post(`api/tickets`, eventData)
        AppState.ticket.push(new Ticket(res.data))
        
    }
}

export const ticketsService = new TicketsService()