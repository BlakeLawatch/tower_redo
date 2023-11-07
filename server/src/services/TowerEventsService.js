import { dbContext } from "../db/DbContext.js"

class TowerEventsService {

    async createEvent(eventData) {
        const newEvent = (await dbContext.TowerEvent.create(eventData)).populate('creator ticketCount')
        return newEvent
    }
}

export const towerEventsService = new TowerEventsService()