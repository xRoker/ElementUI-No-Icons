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
                            trainer {
                                id
                                pokemons {
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