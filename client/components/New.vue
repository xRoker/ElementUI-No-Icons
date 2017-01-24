<template>
	<div class="col-start-center dialog">

		<el-input placeholder="Pokemon name" v-model="newName"></el-input>
		<el-input placeholder="Image URL" v-model="newUrl"></el-input>

		<div class="row-end-end">
			<el-button @click="close()">Cancel</el-button>
			<el-button type="primary" @click="add(newName, newUrl)">Add</el-button>
		</div>

	</div>
</template>

<script>

import gql from 'graphql-tag';
import Queries from 'services/queries';
const queries = new Queries();

// Component def
export default {
	props: ['close', 'trainerId'],

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

<style lang="scss">
	.el-input{
		margin-bottom: 10px;
	}
</style>