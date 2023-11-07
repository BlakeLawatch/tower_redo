import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TowerEventsService {

    async getEvents(eventId) {
        const towerEvents = await dbContext.TowerEvent.find(eventId).populate('ticketCount')
        return towerEvents
    }

    async getEventById(eventId) {
        const getEvent = await dbContext.TowerEvent.findById(eventId)
        return getEvent
    }

    async createEvent(eventData) {
        const newEvent = (await dbContext.TowerEvent.create(eventData)).populate('creator ticketCount')
        return newEvent
    }

    async editEvent(userInfo, userId, eventId) {
        const editedEvent = await dbContext.TowerEvent.findById(eventId)
        if (editedEvent.creatorId != userId) {
            throw new BadRequest('Not yours to update')
        }
        if (editedEvent.isCanceled) {
            throw new BadRequest('this event has been cancelled')
        }
        editedEvent.name = userInfo.name
        editedEvent.description = userInfo.description
        await editedEvent.save()
        return editedEvent
    }

    async cancelEvent(userId, eventId) {
        const cancelledEvent = await this.getEventById(eventId)
        if (cancelledEvent.creatorId != userId) {
            throw new Forbidden('Not yours to delete')
        }

        cancelledEvent.isCanceled = !cancelledEvent.isCanceled
        await cancelledEvent.save()
        return cancelledEvent
    }
}

export const towerEventsService = new TowerEventsService()