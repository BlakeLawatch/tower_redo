<template>
    <div class="modal fade" id="commentModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="createComment()">
                        <div class="mb-3">
                            <label for="description" class="form-label">Say something</label>
                            <textarea v-model="editable.body" class="form-control" id="description" cols="15" rows="10"
                                required maxlength="5000">
                            </textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Comment</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { ref } from 'vue';
import Pop from '../utils/Pop';
import { useRoute } from 'vue-router';
import { commentsService } from '../services/CommentsService';
import { Modal } from 'bootstrap';


export default {
    setup() {
        const editable = ref({})
        const route = useRoute()
        return {
            editable,
            route,

            async createComment() {
                try {
                    const commentData = editable.value
                    commentData.eventId = route.params.eventId
                    await commentsService.createComment(commentData)
                    editable.value = {}
                    Modal.getOrCreateInstance('#commentModal').hide()
                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    }
};
</script>


<style lang="scss" scoped></style>