<template>
	<div class="col-around-center dialog">
		<img :src="obj.url">
		<el-input placeholder="Pokemon name" v-model="obj.name"></el-input>
		<el-button class="delete" @click="remove(obj.id)" type="danger">Delete Pokemon</el-button>
	</div>
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

<style>
	.delete{
		width: 100%;
	}
	img{
		max-height: 110px;
		width: auto;
		margin-bottom: 10px;
	}
</style>