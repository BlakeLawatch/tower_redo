<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12 justify-content-around">
        <button @click="changeEventType('')" class="rounded-pill">All</button>
        <button @click="changeEventType(eventType)" class="rounded-pill" v-for="eventType in eventTypes"
          :key="eventType">{{ eventType }}</button>
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
import { computed, onMounted, ref } from 'vue';
import TowerEventComponent from '../components/TowerEventComponent.vue';
import { AppState } from '../AppState';
import { towerEventsService } from '../services/TowerEventsService';
import Pop from '../utils/Pop';
import { logger } from '../utils/Logger';



export default {
  setup() {
    const eventTypes = ['concert', 'convention', 'sport', 'digital']
    const filteredEventTypes = ref('')
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
      eventTypes,
      towerEvents: computed(() => {
        if (filteredEventTypes.value) {
          return AppState.towerEvents.filter(
            pojo => pojo.type == filteredEventTypes.value
          )
        } else {
          return AppState.towerEvents
        }
      }),

      async changeEventType(eventType) {
        logger.log('eventType', eventTypes)
        filteredEventTypes.value = eventType
      }
    };
  },
  components: { TowerEventComponent }
}
</script>

<style scoped lang="scss"></style>
