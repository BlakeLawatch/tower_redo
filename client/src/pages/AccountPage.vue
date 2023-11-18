<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import { ticketsService } from '../services/TicketsService';
import Pop from '../utils/Pop';
export default {
  setup() {
    onMounted(() => {
      getAccountTickets()
    })

    async function getAccountTickets() {
      try {
        await ticketsService.getAccountTickets()
      } catch (error) {
        Pop.error(error)
      }
    }

    return {
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.tickets)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
