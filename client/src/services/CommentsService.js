import { AppState } from "../AppState"
import { Comment } from "../models/Comment"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentsService{

    async getCommentsByEventId(eventId){
        const res = await api.get(`api/events/${eventId}/comments`)
        AppState.comment = res.data.map(pojo => new Comment(pojo))
        logger.log('got the comments by eventId', res.data)
    }

    async createComment(commentData){
        const res = await api.post(`api/comments`, commentData)
        logger.log('comment created', res.data)
    }
}

export const commentsService = new CommentsService