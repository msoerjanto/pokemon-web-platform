import React, { useState } from "react";
import PokeCatchResult from "./PokeCatchResult";
import styled from '@emotion/styled'
import withContext from "../withContext";
import CatchPokeDialog from "./__mocks__/CatchPokeDialog";

const PokeCatchButton = styled.button``;

function PokeCatchDialogComponent({
    pokemon,
    pokemonCaught = false,
    showCatchResult = false,
    catching,
    invalidName,
    catchPokemon,
    submitPokemon,
}) {

    if (catching) {
        // this is where pokeball pulse animation would go
        return <>Catching...</>;
    }

    if (showCatchResult) {
        // pokemon was either caught or not caught
        return <PokeCatchResult pokemon={pokemon} pokemonCaught={pokemonCaught} submitPokemon={submitPokemon} retry={() => catchPokemon(pokemon)} invalidName={invalidName}/>
    } else {
        // initial state, just show catch button
        return (
            <PokeCatchButton className="btn btn-secondary btn-lg" onClick={() => catchPokemon(pokemon)}>
                CATCH
            </PokeCatchButton>
        );
    }
}

export default PokeCatchDialogComponent;