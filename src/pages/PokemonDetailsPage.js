import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CatchPokeDialog from "../components/CatchPokeDialog";
import { GET_POKEMON_QUERY } from "../graphql/queries/getPokemon";
import withContext from "../withContext";

// TODO implement catch logic here
// only interaction with context should be when we successfully
// catch pokemon and after we name it

function PokemonDetailsPageComponent(props) {
    let { name } = useParams();
    const gqlVariables = {
        name
    };
    const {loading, error, data} = useQuery(GET_POKEMON_QUERY, {variables: gqlVariables});
    const [catchingPokemon, setCatchingPokemon] = useState(false);
    const [pokemonCaught, setPokemonCaught] = useState(false);
    const [load, setLoad] = useState(false);

    const catchPokemon = () => {
        setLoad(true);
        setCatchingPokemon(true);
        if (Math.random() >= 0.5) {
            // success
            setPokemonCaught(true);
        } else {
            // fail
            setPokemonCaught(false);
        }
        setTimeout(() => setLoad(false), 1500);
    }

    const pokemonCaughtEvent = (pokemon) => {
        setCatchingPokemon(false);
        props.context.catchPokemon(pokemon);
    }

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    return <>
        <div className="d-flex justify-content-center">
            <div className="d-flex flex-column col-md-4">
                <h1 >
                    {data.pokemon.name}
                </h1>
                <img src={data.pokemon.sprites.front_default} />
                <CatchPokeDialog
                    loading={load}
                    catchingPokemon={catchingPokemon}
                    pokemon={data.pokemon}
                    catchPokemon={catchPokemon}
                    pokemonCaught={pokemonCaught}
                    submitPokemon={pokemonCaughtEvent}/>
            </div>
        </div>
    </>
}

export default withContext(PokemonDetailsPageComponent);