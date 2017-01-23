<template>
	<md-dialog-content class="col-start-center">

		<md-input-container>
			<label>Pokemon name</label>
			<md-input v-model="newName"></md-input>
		</md-input-container>

		<md-input-container>
			<label>Image URL</label>
			<md-input v-model="newUrl"></md-input>
		</md-input-container>

		<div class="row-end-end">
			<md-button class="md-primary" @click="close()">Cancel</md-button>
			<md-button class="md-primary" @click="add(newName, newUrl)">Add</md-button>
		</div>

	</md-dialog-content>
</template>

<script>

import gql from 'graphql-tag';
import Queries from 'services/queries';
const queries = new Queries();

// Component def
export default {
	props: ['close', 'trainer'],

	data: () => ({
		newName: '',
    newUrl: ''
	}),

	methods: {
		add(name, url){
      this.$apollo.mutate({
        mutation: queries.Pokemons.create,
        variables: {
          name: name,
          url: url,
          trainerId: this.trainerId
        },
        optimisticResponse: {
          __typename: 'Mutation',
          createPokemon: { // mutation name
            __typename: 'Pokemon',
            name: name,
            url: url,
						id: ''
          },
        },
        updateQueries: {
          TrainerQuery: (previousQueryResult, { mutationResult }) => {
            // clone the current object and update with the new entry.
            const clone = JSON.parse(JSON.stringify(previousQueryResult.Trainer));
            clone.pokemons.push(mutationResult.data.createPokemon) // cretePokemon - name of the mutation
            return {
              Trainer: clone
            }
          },
        },
      })
      this.close();
    },
	}
}
</script>