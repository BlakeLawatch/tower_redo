<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12">
        <h1 class="text-center">Filter Bar will go here</h1>
      </div>
    </section>
    <section class="row">
      <TowerEventComponent />
    </section>
  </div>
</template>

<script>
import TowerEventComponent from '../components/TowerEventComponent.vue';



export default {
    setup() {
        return {};
    },
    components: { TowerEventComponent }
}
</script>

<style scoped lang="scss">


</style>
