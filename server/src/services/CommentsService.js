import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class CommentsService {

    async createComment(commentInfo) {
        const comment = (await dbContext.Comment.create(commentInfo)).populate('creator')
        return comment
    }

    async getCommentsByEventId(eventId) {
        const comments = await dbContext.Comment.find({ eventId: eventId }).populate('creator')
        return comments
    }

    async destroyComment(userId, commentId) {
        const wantsToDelete = await dbContext.Comment.findById(commentId)
        if (!wantsToDelete) {
            throw new BadRequest('Nothing to delete')
        }
        if (wantsToDelete.creatorId != userId) {
            throw new Forbidden('Not yours to delete')
        }
        await wantsToDelete.delete()
        return 'Comment Deleted'
    }
}

export const commentsService = new CommentsService()