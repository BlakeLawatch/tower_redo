<template>
   <div v-for="towerEvent in towerEvents" :key="towerEvent" class="col-12 col-md-4">
        <img class="img-fluid event-img" :src="towerEvent.coverImg" alt="" :title="towerEvent.name">
<p>{{ towerEvent.name }}</p>
      </div>
</template>


<script>
import { computed, onMounted } from 'vue';
import { towerEventsService } from '../services/TowerEventsService';
import Pop from '../utils/Pop';
import { AppState } from '../AppState';


export default {
    setup(){
        onMounted(()=> {
        getTowerEvents()
      })

        async function getTowerEvents(){
        try {
          await towerEventsService.getTowerEvents()
        } catch (error) {
          Pop.error(error)
        }
      }
    return { 
        towerEvents: computed(()=> AppState.towerEvents)
     }
    }
};
</script>


<style lang="scss" scoped>
.event-img{
    object-fit: cover;
    object-position: center;
    height: 20vh;
    width: 25vh;
}
</style>