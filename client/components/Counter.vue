<template>
  <div class="counter-wrapper layout-page">

    <div class="counter">
      {{ count }}
    </div>

    <div class="row-around-center sm-col-center-center">
      <md-button @click="$store.commit('INCREMENT')">Increment</md-button>
      <md-button @click="$store.commit('DECREMENT')">Decrement</md-button>
      <md-button @click="$store.dispatch('incrementAsync')">Increment Async</md-button>
    </div>
    <div class="flex-1"></div>
    <div style="width: 100%; height: 50px; background: blue;"></div>
  </div>

</template>

<script>
export default {
  computed: {
    count() {
      return this.$store.state.count
    }
  }
}
</script>

<style>
.counter {
  margin: 100px auto;
  border-radius: 3px;
  width: 200px;
  height: 200px;
  text-align: center;
  line-height: 200px;
  font-size: 5rem;
  background-color: #f0f0f0;
  user-select: none;
}
</style>
