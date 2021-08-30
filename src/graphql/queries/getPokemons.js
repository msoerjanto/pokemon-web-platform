import { gql } from "@apollo/client";

export const GET_POKEMONS_QUERY = gql`
    query pokemons($limit: Int, $offset: Int) {
        pokemons(limit: $limit, offset: $offset) {
        next
        previous
        nextOffset
        prevOffset
        results {
            url
            name
            image
        }
        }
    }
`;