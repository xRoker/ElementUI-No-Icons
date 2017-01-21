<template>
  <div class="pokedex">
    <template v-if="loading > 0">
      Loading
    </template>
    <template v-else>
      <div>
        Hey {{ Trainer.name }}, you have {{ Trainer.pokemons.length }} pokemons in your pokedex
      </div>
      <ul>
        <li v-for="pokemon in pokemons" :key="pokemon.id">
          {{ pokemon.name }}
          <img :src="pokemon.url">
        </li>
      </ul>

      <input v-model="newName">
      <input v-model="newUrl">
      <button v-on:click="add(newName, newUrl)">Add</button>
    </template>
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
    newUrl: ''
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
    add: function(name, url){
      this.$apollo.mutate({
        mutation: queries.Pokemons.create,
        variables: {
          name: name,
          url: url,
          trainerId: this.Trainer.id
        }
      })
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
