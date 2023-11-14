<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12">
        <h1 class="text-center">Filter Bar will go here</h1>
      </div>
    </section>
    <section class="row">
      <div v-for="towerEvent in towerEvents" :key="towerEvent.id" class="col-12 col-md-4 text-center">
        <TowerEventComponent :towerEvent="towerEvent" />
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import TowerEventComponent from '../components/TowerEventComponent.vue';
import { AppState } from '../AppState';
import { towerEventsService } from '../services/TowerEventsService';
import Pop from '../utils/Pop';



export default {
  setup() {
    onMounted(() => {
      getTowerEvents()
    })

    async function getTowerEvents() {
      try {
        await towerEventsService.getTowerEvents()
      } catch (error) {
        Pop.error(error)
      }
    }
    return {
      towerEvents: computed(() => AppState.towerEvents)
    };
  },
  components: { TowerEventComponent }
}
</script>

<style scoped lang="scss"></style>
