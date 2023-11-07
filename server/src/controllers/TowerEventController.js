import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { dbContext } from "../db/DbContext.js";
import { towerEventsService } from "../services/TowerEventsService.js";

export class TowerEventController extends BaseController {
    constructor() {
        super('api/events')
        this.router

            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
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
}
