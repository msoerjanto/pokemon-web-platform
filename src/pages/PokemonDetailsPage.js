import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { GET_POKEMON_QUERY } from "../graphql/queries/getPokemon";
import withContext from "../withContext";


function PokemonDetailsPageComponent() {
    let { name } = useParams();

    const gqlVariables = {
        name
    };
    const {loading, error, data} = useQuery(GET_POKEMON_QUERY, {variables: gqlVariables});
    console.log('detail result: ', data);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    return <>
        <div className="d-flex justify-content-center">
            <div className="d-flex flex-column">
                <h1 >
                    {data.pokemon.name}
                </h1>
                <img src={data.pokemon.sprites.front_default} />
            </div>
        </div>
    </>
}

export default withContext(PokemonDetailsPageComponent);