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
        <el-card v-for="pokemon in pokemons" :key="pokemon.id" class="box">
          <div @click="openPokemon(pokemon)" class="col-center-center">
            {{ pokemon.name }}
            <img :src="pokemon.url">
          </div>
        </el-card>

      </div>
    </template>
    
    <!-- Dialogs -->
    <el-dialog title="Pokemon" v-model="dialogVisible" size="tiny">
      <pokemon :obj="selected" :close="closePokemon" :trainerId="Trainer.id"></pokemon>
    </el-dialog>

    <el-dialog title="Add your Pokemon" v-model="newOpen" size="tiny">
      <new :close="closeNew" :trainerId="Trainer.id"></new>
    </el-dialog>
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
    dialogVisible: false,
    newOpen: false,
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
      this.dialogVisible = true;
    },
    closePokemon() {
      this.dialogVisible = false;
    },
    openNew() {
      this.newOpen = true;
    },
    closeNew() {
      this.newOpen = false;
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
    width: 150px;
    height: 150px;
    font-size: 14px;

    img{
      width: 90px;
      height: 90px;
    }
  }

  .message{
    font-size: 14px;
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
