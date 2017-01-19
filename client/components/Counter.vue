<template>
  <div class="counter-wrapper">

    <md-whiteframe>
      <md-toolbar>
        <md-button class="md-icon-button">
          <md-icon>menu</md-icon>
        </md-button>

        <h2 class="md-title" style="flex: 1">Default</h2>

        <md-button class="md-icon-button">
          <md-icon>favorite</md-icon>
        </md-button>
      </md-toolbar>
    </md-whiteframe>

    <div class="counter">
      {{ count }}
    </div>
    <md-button @click="$store.commit('INCREMENT')">Increment</md-button>
    <md-button @click="$store.commit('DECREMENT')">Decrement</md-button>
    <md-button @click="$store.dispatch('incrementAsync')">Increment Async</md-button>
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
