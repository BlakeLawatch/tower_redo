<template>
  <router-link :to="{ name: 'EventDetails', params: { eventId: towerEvent.id } }">

    <img class="img-fluid event-img" :src="towerEvent.coverImg" alt="" :title="towerEvent.name">
    <p>{{ towerEvent.name }}</p>


  </router-link>
</template>


<script>
import { computed, onMounted } from 'vue';
import { towerEventsService } from '../services/TowerEventsService';
import Pop from '../utils/Pop';
import { AppState } from '../AppState';
import { RouterLink, useRouter } from 'vue-router';
import { TowerEvent } from '../models/TowerEvent';



export default {
  props: { towerEvent: { type: TowerEvent, required: true } },
  setup() {
    const router = useRouter()

    return {
      towerEvents: computed(() => AppState.towerEvents),
      router

    }
  },
  components: { RouterLink }
};
</script>


<style lang="scss" scoped>
.event-img {
  object-fit: cover;
  object-position: center;
  height: 20vh;
  width: 25vh;
}
</style>