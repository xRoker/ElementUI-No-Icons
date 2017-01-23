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
      
        <div @click="openNew()" class="new box col-center-center">+</div>
        <md-whiteframe v-for="pokemon in pokemons" :key="pokemon.id" class="box">
          <md-ink-ripple />
          <div @click="openPokemon(pokemon)" class="col-center-center">
            {{ pokemon.name }}
            <img :src="pokemon.url">
          </div>
        </md-whiteframe>

      </div>
    </template>
    
    <!-- Dialogs -->
    <md-dialog ref="pokemon">
      <md-dialog-title>{{ selected.name }}</md-dialog-title>
      <pokemon :obj="selected" :close="closePokemon" :trainerId="Trainer.id"></pokemon>
      <md-dialog-actions>
        <md-button class="md-primary" @click="closePokemon()">Cancel</md-button>
        <md-button class="md-primary" @click="closePokemon()">Save</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog ref="new">
      <md-dialog-title>Add your Pokemon</md-dialog-title>
      <new :close="closeNew"></new>
    </md-dialog>
  </div>



  </div>
</template>

<script>

import gql from 'graphql-tag';
import Queries from 'services/queries';
const queries = new Queries();
import Pokemon from 'components/Pokemon'
import New from 'components/New'

// Component def
export default {
  // Local state
  data: () => ({
    Trainer: { pokemons: [] },
    loading: 0,
    Poke: { name: ''},
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
    },
    subscribe: {
      // When a tag is added
      pokemons: {
        query: queries.Pokemons.subscribe,
        // Reactive variables
        variables: null,
        // Result hook
        updateQueries: {
          TrainerQuery: (previousQueryResult, { mutationResult }) => {
            // clone the current object and update with the new entry.
            const clone = JSON.parse(JSON.stringify(this.Trainer));
            clone.pokemons.push(mutationResult.data.createPokemon) // cretePokemon - name of the query
            return {
              Trainer: clone
            }
          },
        },
      },
    },
  },

  methods: {

    openPokemon(pokemon) {
      this.selected = pokemon;
      this.$refs["pokemon"].open();
    },
    closePokemon() {
      this.$refs["pokemon"].close();
    },
    openNew() {
      this.$refs["new"].open();
    },
    closeNew() {
      this.$refs["new"].close();
    }
  },

  // Computed properties
  computed: {
    pokemons() {
      return this.Trainer.pokemons.slice().reverse()
    }
  },

  components: {
    Pokemon,
    New
  }
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
  .new{
    border: 2px dashed grey;
    border-radius: 15px;
    color: grey;
    font-size: 40px;
    width: 150px;
    height: 150px;
  }
  .new:hover{
    border-color: #3f51b5;
    color: #3f51b5;
  }
</style>
