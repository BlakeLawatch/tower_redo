import { dbContext } from "../db/DbContext.js"

class CommentsService {

    async createComment(commentInfo) {
        const comment = (await dbContext.Comment.create(commentInfo)).populate('creator')
        return comment
    }

    async getCommentsByEventId(eventId) {
        const comments = await dbContext.Comment.find({ eventId: eventId }).populate('creator')
        return comments
    }
}

export const commentsService = new CommentsService()