<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <section class="row">
    <div class="col-12 col-md-3 text-center my-2" v-for="myTicket in myTickets" :key="myTicket.id">
      <div class="card-bg rounded p-2">
        <img class="event-img img-fluid" :src="myTicket.event.coverImg" alt="">
        <p>{{ myTicket.event.name }}</p>
        <button @click="cancelTicket(myTicket.id)" class="btn btn-outline-danger"><i
            class="mdi mdi-delete-circle"></i></button>

      </div>
    </div>
  </section>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { ticketsService } from '../services/TicketsService'


export default {
  setup() {
    return {
      account: computed(() => AppState.account),
      myTickets: computed(() => AppState.myTickets),
      async cancelTicket(ticketId) {
        try {
          const wantToCancel = await Pop.confirm('you sure about that?');
          if (!wantToCancel) {
            return;
          }
          await ticketsService.cancelTicket(ticketId);
        }
        catch (error) {
          Pop.error(error);
        }
      }
    };
  },
}
</script>

<style scoped>
.event-img {
  object-fit: contain;
  object-position: center;
  height: 20vh;
  width: 100%;
}

.card-bg {
  background-color: rgba(128, 128, 128, 0.411);
}
</style>
