<template>
	<div class="col-around-center dialog">
		<img :src="obj.url">
		<el-input placeholder="Pokemon name" :value="obj.name" @input="updateName"></el-input>
		<el-button class="delete" @click="remove(obj.id)" type="danger">Delete Pokemon</el-button>

		<div class="row-center-end" style="margin-top: 20px;">
			<el-button @click="close()">Cancel</el-button>
			<el-button type="primary" @click="update(obj.id)">Save</el-button>
		</div>
	</div>
</template>

<script>

import gql from 'graphql-tag';
import Queries from 'services/queries';
const queries = new Queries();

const UPDATE_NAME = gql`
	mutation UpdateName($name: String!, $id: ID!) {
		updatePokemon(id: $id, name: $name) {
				id,
				name
			}
		}
	`;

// Component def
export default {
	props: ['obj', 'close'],
	data: () => ({
		name: null
	}),
	methods: {
		updateName(newName){
			name = newName;
		},

		update(id){
			if(!name) return;

			this.$apollo.mutate({
				mutation: UPDATE_NAME,
				optimisticResponse: {
					updatePokemon: {
						id: id,
						name: name
					}
				},
				variables: {
					id: id,
					name: name
				}
			});
			this.close();
		},

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