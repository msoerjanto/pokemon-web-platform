import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CatchPokeDialog from "../components/PokeCatchDialog";
import { GET_POKEMON_QUERY } from "../graphql/queries/getPokemon";
import withContext from "../withContext";

function PokemonDetailsPageComponent(props) {
    let { name } = useParams();
    const gqlVariables = {
        name
    };
    const { loading, error, data } = useQuery(GET_POKEMON_QUERY, { variables: gqlVariables });
    const [showCatchResult, setShowCatchResult] = useState(false);
    const [pokemonCaught, setPokemonCaught] = useState(false);
    const [catching, setCatching] = useState(false);
    const [invalidName, setInvalidName] = useState(false);
    
    const savePokemon = (pokemon) => {
        if (props.context.pokecaught.find(myPoke => myPoke.nickname === pokemon.nickname)) {
            // name taken
            setInvalidName(true);
        } else {
            setInvalidName(false);
            setPokemonCaught(false);
            setShowCatchResult(false);
            props.context.catchPokemon(pokemon);
        }
    };

    const catchPokemon = () => {
        setCatching(true);
        setShowCatchResult(true);
        if (Math.random() >= 0.5) {
            // success
            setPokemonCaught(true);
        } else {
            // fail
            setPokemonCaught(false);
        }
        setTimeout(() => setCatching(false), 1000);
    }

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    return <>
        <div className="d-flex flex-column justify-content-center">
            <h1 >
                {data.pokemon.name}
            </h1>
            <img width="200px" className="align-self-center" src={data.pokemon.sprites.front_default} />
            <CatchPokeDialog
                pokemon={data.pokemon}
                pokemonCaught={pokemonCaught}
                showCatchResult={showCatchResult}
                catching={catching}
                invalidName={invalidName}
                catchPokemon={catchPokemon}
                submitPokemon={savePokemon} />
        </div>
    </>
}

export default withContext(PokemonDetailsPageComponent);