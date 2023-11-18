<template>
    <div v-if="activeEvent" class="container-fluid">
        <section class="row">
            <div class="col-12">
                <section class="row mt-3">
                    <div class="col-5 text-center">
                        <img v-if="activeEvent.isCanceled || activeEvent.ticketCount >= activeEvent.capacity"
                            class="img-fluid img-cancelled" :src="activeEvent.coverImg" alt="">
                        <img v-else class="img-fluid" :src="activeEvent.coverImg" alt="">
                    </div>
                    <div class="col-4">
                        <h1>{{ activeEvent.name }}</h1>
                        <h2>Location: {{ activeEvent.location }}</h2>
                        <h3>{{ activeEvent.description }}</h3>
                    </div>
                    <div class="col-3">
                        <h4>{{ activeEvent.startDate.toLocaleDateString() }}</h4>
                        <h4>Tickets sold: {{ activeEvent.ticketCount }}</h4>
                        <h4>Total Capacity: {{ activeEvent.capacity }}</h4>
                        <h4>{{ activeEvent.type }}</h4>
                        <button v-if="activeEvent.creatorId == account.id && activeEvent.isCanceled == false"
                            @click="cancelEvent()" class="btn btn-outline-danger">Cancel Event</button>
                        <h4 v-if="activeEvent.isCanceled">This event is cancelled</h4>
                        <h4 v-if="activeEvent.ticketCount >= activeEvent.capacity">This event is sold out</h4>
                        <h4 v-if="activeEvent.isCanceled || activeEvent.ticketCount >= activeEvent.capacity"> Can't buy a
                            ticket</h4>
                        <button @click="buyTicket()" v-else class="btn btn-outline-info">Purchase Ticket</button>
                        <button data-bs-toggle="modal" data-bs-target="#commentModal"
                            class="btn btn-outline-success">Comment</button>
                        <CommentModal />
                    </div>
                </section>
                <section v-for="ticket in tickets" :key="ticket.id">
                    <img :src="ticket.profile.picture" alt="" :title="ticket.profile.name">
                    <p> {{ ticket.profile.name }}</p>
                </section>
                <section class="row">
                    <div class="col-6 d-flex comment-card p-3 ms-2 my-2" v-for="comment in comments" :key="comment.id">
                        <div class="col-4">
                            <img class="rounded-circle img-fluid" :src="comment.creator.picture" alt=""
                                :title="comment.creator.name">
                            <p class="my-1"> {{ comment.creator.name }}</p>
                        </div>
                        <div class="col-8 py-3">
                            <p>{{ comment.body }}</p>
                            <button v-if="comment.creatorId == account.id" @click="destroyComment(comment.id)"
                                class="btn btn-outline-danger mdi mdi-delete-circle mt-1 text-end">Delete</button>
                        </div>
                        <div>

                        </div>
                    </div>
                </section>
            </div>
        </section>
    </div>
</template>


<script>
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop';
import { towerEventsService } from '../services/TowerEventsService';
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState'
import { commentsService } from '../services/CommentsService'
import { ticketsService } from '../services/TicketsService'

export default {
    setup() {
        onMounted(() => {
            getEventById()
            getCommentsByEventId()
            getEventTickets()
        })
        const route = useRoute()

        async function getEventById() {
            try {

                const eventId = route.params.eventId
                await towerEventsService.getEventById(eventId)
            } catch (error) {
                Pop.error(error)
            }

        }

        async function getCommentsByEventId() {
            try {
                const eventId = route.params.eventId
                await commentsService.getCommentsByEventId(eventId)
            } catch (error) {
                Pop.error(error)
            }
        }

        async function getEventTickets() {
            try {
                const eventId = route.params.eventId
                await ticketsService.getEventTickets(eventId)
            } catch (error) {
                Pop.error(error)
            }
        }

        return {
            route,
            activeEvent: computed(() => AppState.activeEvent),
            account: computed(() => AppState.account),
            comments: computed(() => AppState.comment),
            tickets: computed(() => AppState.tickets),


            async cancelEvent() {
                try {
                    const cancelEvent = await Pop.confirm('You sure about that?')
                    if (!cancelEvent) {
                        return
                    }
                    const eventId = route.params.eventId
                    await towerEventsService.cancelEvent(eventId)
                } catch (error) {
                    Pop.error(error)
                }
            },

            async destroyComment(commentId) {
                try {
                    const wantsToDelete = await Pop.confirm('you sure about that?')
                    if (!wantsToDelete) {
                        return
                    }
                    await commentsService.destroyComment(commentId)
                } catch (error) {
                    Pop.error(error)
                }
            },

            async buyTicket() {
                try {
                    const eventId = route.params.eventId
                    await ticketsService.buyTicket(eventId)
                    Pop.success('You purchased a ticket')
                    this.activeEvent.ticketCount++
                } catch (error) {
                    Pop.error(error)
                }
            },




        }
    }
};
</script>


<style lang="scss" scoped>
.img-cancelled {
    opacity: .33;
    border: thick double red;
}

.comment-card {
    background-color: #80808073;
    border-radius: 20px;
}
</style>