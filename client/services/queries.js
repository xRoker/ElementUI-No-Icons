import gql from 'graphql-tag';
export default class Queries {

    constructor(){
        this.Trainers = {
            get: gql`
                query TrainerQuery($name: String!) {
                    Trainer(name: $name) {
                    id
                    name
                    pokemons {
                        id
                        name
                        url
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