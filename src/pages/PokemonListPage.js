import { useQuery } from '@apollo/client';
import React from "react";
import PageControl from '../components/PageControl';
import PokemonCardContainer from '../components/PokemonCardContainer';
import PokeOwned from '../components/PokeOwned';
import { GET_POKEMONS_QUERY } from '../graphql/queries/getPokemons';
import withContext from '../withContext';
import ListPokeCard from '../components/ListPokeCard';
import styled from '@emotion/styled';
import logo from '../images/Pokemon-Web.png';

const Image = styled.img`
    display: block;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 90%;
    margin: 20px auto;
`;

function PokemonListPageComponent(props) {
    const gqlVariables = {
        limit: 45,
        offset: 0,
    };

    const { loading, error, data, refetch } = useQuery(GET_POKEMONS_QUERY, { variables: gqlVariables });
    const setOffset = (offset) => {
        refetch({ offset });
    };

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    console.log(data);
    return <>
        <div className="d-flex flex-column align-items-center">
            <Image src={logo} />
            <PokeOwned caught={props.context.pokecaught} />
            <PokemonCardContainer className="d-flex flex-wrap col-md-8">
                {data.pokemons.results.map(pokemon => <ListPokeCard key={pokemon.name} name={pokemon.name} image={pokemon.image} />)}
            </PokemonCardContainer>
            <PageControl
                next={data.pokemons.next}
                prev={data.pokemons.previous}
                prevOffset={data.pokemons.prevOffset}
                nextOffset={data.pokemons.nextOffset}
                changePage={setOffset}
            />
        </div>
    </>
}

export default withContext(PokemonListPageComponent);