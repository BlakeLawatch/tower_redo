import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { dbContext } from "../db/DbContext.js";
import { towerEventsService } from "../services/TowerEventsService.js";

export class TowerEventController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getEvents)
            .get('/:eventId', this.getEventById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
            .put('/:eventId', this.editEvent)
            .delete('/:eventId', this.cancelEvent)
    }
    async getEvents(req, res, next) {
        try {
            const eventId = req.params.eventId
            const towerEvents = await towerEventsService.getEvents(eventId)
            return res.send(towerEvents)
        } catch (error) {
            next(error)
        }
    }
    async getEventById(req, res, next) {
        try {
            const eventId = req.params.eventId
            const getEvent = await towerEventsService.getEventById(eventId)
            return res.send(getEvent)
        } catch (error) {
            next(error)
        }
    }


    async createEvent(req, res, next) {
        try {
            const eventData = req.body
            const userId = req.userInfo.id
            eventData.creatorId = userId
            const newEvent = await towerEventsService.createEvent(eventData)
            return res.send(newEvent)
        } catch (error) {
            next(error)
        }
    }
    async editEvent(req, res, next) {
        try {
            const userInfo = req.body
            const userId = req.userInfo.id
            const eventId = req.params.eventId
            const editedEvent = await towerEventsService.editEvent(userInfo, userId, eventId)
            return res.send(editedEvent)
        } catch (error) {
            next(error)
        }
    }
    async cancelEvent(req, res, next) {
        try {
            const userId = req.userInfo.id
            const eventId = req.params.eventId
            const deletedEvent = await towerEventsService.cancelEvent(userId, eventId)
            return res.send(deletedEvent)
        } catch (error) {
            next(error)
        }
    }
}
