import { useQuery } from '@apollo/client';
import styled from '@emotion/styled'
import React from "react";
import PokeCard from '../components/PokeCard';
import { GET_POKEMONS_QUERY } from '../graphql/queries/getPokemons';
import withContext from '../withContext';

const PokemonCardContainer = styled.div`

`;

function PokemonListPageComponent() {
    const gqlVariables = {
        limit: 32,
        offset: 0,
    };
    const { loading, error, data } = useQuery(GET_POKEMONS_QUERY, { variables: gqlVariables });
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return <>
        <div className="d-flex justify-content-center">
            <PokemonCardContainer className="d-flex flex-wrap col-md-8">
                {data.pokemons.results.map(pokemon => <PokeCard key={pokemon.name} pokemon={pokemon} />)}
            </PokemonCardContainer>
        </div>
    </>
}

export default withContext(PokemonListPageComponent);