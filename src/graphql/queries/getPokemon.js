import { gql } from "@apollo/client";

export const GET_POKEMON_QUERY = gql`
    query pokemon($name: String!) {
        pokemon(name: $name) {
            name
    		sprites {
                front_default
            }
        }
    }
`;