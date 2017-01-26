import gql from 'graphql-tag';
export default class Queries {

    constructor(){
        this.Trainers = {
            get: gql`
                query TrainerQuery($name: String!, $first: Int!, $skip: Int!) {
                    Trainer(name: $name) {
                        id
                        name
                        pokemons(first: $first, skip: $skip) {
                            id
                            name
                            url
                        }
                        _pokemonsMeta{
                            count
                        }
                    }
                }
            `
        }

        this.Pokemons = {
            create: gql`
                    mutation NewPokemon($name: String!, $url: String, $trainerId: ID) {
                        createPokemon(name: $name, url: $url, trainerId: $trainerId) {
                            id
                            name
                            url
                        }
                    }
                `,
            delete: gql`
                mutation DeletePokemon($id: ID!){
                    deletePokemon(id: $id){
                        id
                    }
                }
            `,
            subscribe: gql`
                subscription {
                    createPokemon{
                        trainer {
                            id
                            pokemons{
                                id
                                name
                                url
                            }
                        }
                    }
                }
            `
        }
    }

}