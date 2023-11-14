import { AppState } from "../AppState"
import { TowerEvent } from "../models/TowerEvent"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TowerEventsService{

    async getTowerEvents(){
        const res = await api.get('api/events')
        AppState.towerEvents = res.data.map((pojo) => new TowerEvent(pojo))
        logger.log('got mapped events!', res.data)
    }

    async createEvent(eventData){
        const res = await api.post('api/events', eventData)
        logger.log('created an event', res.data)
        const newEvent = new TowerEvent(res.data)
        AppState.towerEvents.push(newEvent)
        return newEvent
    }

    async getEventById(eventId){
        const res = await api.get(`api/events/${eventId}`)
        logger.log('getting event by id',res.data)
        AppState.activeEvent = new TowerEvent(res.data)
        
    }
    async cancelEvent(eventId){
        const res = await api.delete(`api/events/${eventId}`)
        AppState.activeEvent = new TowerEvent(res.data)  
        logger.log('cancelling event', res.data)
        
    }
}

export const towerEventsService = new TowerEventsService()