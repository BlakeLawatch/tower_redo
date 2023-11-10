import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";

export class TicketsController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router

            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTicket)
            .delete('/:ticketId', this.destroyTicket)
    }
    async createTicket(req, res, next) {
        try {
            const ticketInfo = req.body
            const userId = req.userInfo.id
            ticketInfo.accountId = userId
            const newTicket = await ticketsService.createTicket(ticketInfo)
            return res.send(newTicket)
        } catch (error) {
            next(error)
        }
    }
    async destroyTicket(req, res, next) {
        try {
            const ticketId = req.params.ticketId
            const userId = req.userInfo.id
            const destroyedTicket = await ticketsService.destroyTicket(ticketId, userId)
            return res.send(destroyedTicket)
        } catch (error) {
            next(error)
        }
    }
}