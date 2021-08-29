import { useQuery } from '@apollo/client';
import React, { useState } from "react";
import PageControl from '../components/PageControl';
import PokeCard from '../components/PokeCard';
import PokemonCardContainer from '../components/PokemonCardContainer';
import PokeOwned from '../components/PokeOwned';
import { GET_POKEMONS_QUERY } from '../graphql/queries/getPokemons';
import withContext from '../withContext';



function PokemonListPageComponent(props) {
    const gqlVariables = {
        limit: 45,
        offset: 0,
    };

    const { loading, error, data, refetch } = useQuery(GET_POKEMONS_QUERY, { variables: gqlVariables });
    const onNext = (nextOffset) => {
        refetch({ offset: nextOffset});
    };

    const onPrev = (prevOffset) => {
        refetch({ offset: prevOffset});
    }
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    console.log(data);
    return <>
        <div className="d-flex flex-column align-items-center">
            <h1>
                Pokemon List Page
            </h1>
            <PokeOwned caught={props.context.pokecaught} />
            <PokemonCardContainer className="d-flex flex-wrap col-md-8">
                {data.pokemons.results.map(pokemon => <PokeCard key={pokemon.name} name={pokemon.name} image={pokemon.image} />)}
            </PokemonCardContainer>
            <PageControl
                prev={data.pokemons.prevOffset}
                next={data.pokemons.nextOffset}
                onNext={onNext}
                onPrev={onPrev}
                />
        </div>
    </>
}

export default withContext(PokemonListPageComponent);