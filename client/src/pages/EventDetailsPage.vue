<template>
    <div v-if="activeEvent" class="container-fluid">
        <section class="row">
            <div class="col-12">
                <section class="row mt-3">
                    <div class="col-5 text-center">
                        <img class="img-fluid" :src="activeEvent.coverImg" alt="">
                    </div>
                    <div class="col-4">
                        <h1>{{ activeEvent.name }}</h1>
                        <h2>Location: {{ activeEvent.location }}</h2>
                        <h3>{{ activeEvent.description }}</h3>
                    </div>
                    <div class="col-3">
                        <h4>{{ activeEvent.startDate.toLocaleDateString() }}</h4>
                        <h4>{{ activeEvent.ticketCount }}</h4>
                        <h4>{{ activeEvent.type }}</h4>
                        <button v-if="activeEvent.creatorId == account.id && activeEvent.isCanceled == false"
                            @click="cancelEvent()" class="btn btn-outline-danger">Cancel Event</button>
                        <h4 v-if="activeEvent.isCanceled">This event is cancelled</h4>
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

export default {
    setup() {
        onMounted(() => {
            getEventById()
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

        return {
            route,
            activeEvent: computed(() => AppState.activeEvent),
            account: computed(() => AppState.account),

            async cancelEvent() {
                try {
                    const cancelEvent = await Pop.confirm('Are you sure about that?')
                    if (!cancelEvent) {
                        return
                    }
                    const eventId = route.params.eventId
                    await towerEventsService.cancelEvent(eventId)

                } catch (error) {
                    Pop.error(error)
                }


            }

        }
    }
};
</script>


<style lang="scss" scoped></style>