<template>
  <span class="navbar-text">
    <button class="btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0" @click="login"
      v-if="!user.isAuthenticated">
      Login
    </button>
    <div v-else>
      <div class="dropdown my-2 my-lg-0">
        <div type="button" class="bg-dark border-0 selectable no-select" data-bs-toggle="dropdown" aria-expanded="false">
          <div v-if="account.picture || user.picture">
            <img :src="account.picture || user.picture" alt="account photo" height="40" class="rounded" />
          </div>
        </div>
        <div class="dropdown-menu dropdown-menu-lg-end dropdown-menu-start p-0" aria-labelledby="authDropdown">
          <div class="list-group">
            <router-link :to="{ name: 'Account' }">
              <div class="list-group-item dropdown-item list-group-item-action">
                Manage Account
              </div>
            </router-link>
            <div class="text-center" type="button" data-bs-toggle="modal" data-bs-target="#createEvent">
              Create Event
            </div>
            <div class="list-group-item dropdown-item list-group-item-action text-danger selectable" @click="logout">
              <i class="mdi mdi-logout"></i>
              logout
            </div>
          </div>
        </div>
      </div>
    </div>
  </span>
  <div class="modal fade" id="createEvent" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 text-dark" id="staticBackdropLabel">Create your event!</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createEvent()" class="text-dark">
            <div class="mb-3">
              <label for="name" class="form-label">Name of event</label>
              <input v-model="editable.name" type="text" class="form-control" id="name" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
              <label for="coverImg" class="form-label">coverImg of event</label>
              <input v-model="editable.coverImg" type="text" class="form-control" id="coverImg"
                aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
              <label for="location" class="form-label">location of event</label>
              <input v-model="editable.location" type="text" class="form-control" id="location"
                aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
              <label for="capacity" class="form-label">capacity of event</label>
              <input v-model="editable.capacity" type="number" class="form-control" id="capacity"
                aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
              <label for="startDate" class="form-label">startDate of event</label>
              <input v-model="editable.startDate" type="date" class="form-control" id="startDate"
                aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
              <label for="eventTypes" class="form-label">type of event</label>
              <select v-model="editable.eventType" class="form-select" name="" id="">
                <option :value="eventType" :key="eventType" v-for="eventType in eventTypes"> {{ eventType }}</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">description of event</label>
              <textarea v-model="editable.description" name="" id="" cols="50" rows="10"></textarea>
            </div>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Submit Event</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
import { towerEventsService } from '../services/TowerEventsService'
import { Modal } from 'bootstrap'
import Pop from '../utils/Pop'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const eventTypes = ['concert', 'convention', 'sport', 'digital']
    const editable = ref({})
    const router = useRouter()
    return {
      eventTypes,
      editable,
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      },

      async createEvent() {
        try {
          const eventData = editable.value
          const event = await towerEventsService.createEvent(eventData)
          Pop.success('you created an event')
          editable.value = {}
          Modal.getOrCreateInstance('#createEvent').hide()
          router.push({ name: 'EventDetails', params: { eventId: event.id } })
        } catch (error) {
          Pop.error(error)
        }
      }

    }
  },

}
</script>

<style lang="scss" scoped></style>
