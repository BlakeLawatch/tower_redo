import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentsService } from "../services/CommentsService.js";

export class CommentController extends BaseController {
    constructor() {
        super(`api/comments`)
        this.router

            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createComment)
            .delete('/:commentId', this.destroyComment)
    }
    async createComment(req, res, next) {
        try {
            const commentInfo = req.body
            const userId = req.userInfo.id
            commentInfo.creatorId = userId
            const comment = await commentsService.createComment(commentInfo)
            return res.send(comment)
        } catch (error) {
            next(error)
        }

    }
    async destroyComment(req, res, next) {
        try {
            const userId = req.userInfo.id
            const commentId = req.params.commentId
            const deletedComment = await commentsService.destroyComment(userId, commentId)
            return res.send(deletedComment)
        } catch (error) {
            next(error)
        }
    }

}