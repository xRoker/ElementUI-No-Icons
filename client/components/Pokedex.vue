<template>
  <div class="pokedex">
    <template v-if="loading > 0">
      Loading
    </template>
    <template v-else>
      <div class="message">
        Hey {{ Trainer.name }}, you have {{ Trainer.pokemons.length }} pokemons in your pokedex
      </div>
      <div class="row-start-center wrap">
        <md-whiteframe v-for="pokemon in pokemons" :key="pokemon.id" class="box">
          <md-ink-ripple />
          <div @click="openPokemon(pokemon)" class="col-center-center">
            {{ pokemon.name }}
            <img :src="pokemon.url">
          </div>
        </md-whiteframe>
      </div>

      <input v-model="newName">
      <input v-model="newUrl">
      <button v-on:click="add(newName, newUrl)">Add</button>
    </template>
    
    <md-dialog ref="dialog">
      <md-dialog-title>{{ selected.name }}</md-dialog-title>

      <md-dialog-content class="col-start-center">
        <img :src="selected.url">
        <md-input-container>
          <md-input v-model="selected.name"></md-input>
        </md-input-container>
        <md-button class="flex-1 md-raised md-accent">Delete Pokemon</md-button>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="closeDialog()">Cancel</md-button>
        <md-button class="md-primary" @click="closeDialog()">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>

</template>

<script>

import gql from 'graphql-tag';
import Queries from 'services/queries';
const queries = new Queries();

// Component def
export default {
  // Local state
  data: () => ({
    Trainer: { pokemons: [] },
    loading: 0,
    Poke: { name: ''},
    newName: '',
    newUrl: '',
    selected: {}
  }),
  // Apollo GraphQL
  apollo: {
    Trainer: {
      query: queries.Trainers.get,
      variables: {
        name: 'Alex',
      },
      loadingKey: 'loading',
    }
  },

  methods: {
    add(name, url){
      this.$apollo.mutate({
        mutation: queries.Pokemons.create,
        variables: {
          name: name,
          url: url,
          trainerId: this.Trainer.id
        }
      })
    },
    openPokemon(pokemon) {
      this.selected = pokemon;
      this.$refs["dialog"].open();
    },
    closeDialog() {
      this.$refs["dialog"].close();
    }
  },

  // Computed properties
  computed: {
    pokemons() {
      return this.Trainer.pokemons.slice().reverse()
    }
  },
};
</script>

<style lang="scss">
  .box{
    margin: 10px;
    cursor: pointer;
  }
  .box div{
    width: 150px;
    height: 150px;
    padding: 20px;
  }
  .message{
    font-size: 18px;
    padding: 20px;
    text-align: center;
  }
</style>
