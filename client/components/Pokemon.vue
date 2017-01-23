<template>
	<md-dialog-content class="col-start-center">
		<img :src="obj.url">
		<md-input-container>
			<md-input v-model="obj.name"></md-input>
		</md-input-container>
		<md-button @click="remove(obj.id)" class="flex-1 md-raised md-accent">Delete Pokemon</md-button>
	</md-dialog-content>
</template>

<script>

import gql from 'graphql-tag';
import Queries from 'services/queries';
const queries = new Queries();

// Component def
export default {
	props: ['obj', 'close'],
	methods: {
		remove(id){
			this.$apollo.mutate({
				mutation: queries.Pokemons.delete,
				variables: {
				id: id
				},
				optimisticResponse: {
				deletePokemon: id
				},
				updateQueries: {
					TrainerQuery: (previousQueryResult, { mutationResult }) => {
						// clone the current object and update with the new entry.
						const clone = JSON.parse(JSON.stringify(previousQueryResult.Trainer));
						const deleteId = mutationResult.data.deletePokemon.id;
						const deleteIndex = clone.pokemons.findIndex(el => el.id === deleteId);
						clone.pokemons.splice(deleteIndex, 1); // remove element by index
						return {
						Trainer: clone
						}
					},
				},
			})
			this.close();
			}
		}
}
</script>