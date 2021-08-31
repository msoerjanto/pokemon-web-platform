import React from 'react';
const CatchPokeDialog = ({
    pokemon,
    submitPokemon
}) => {
    return (
        <div>
            <button onClick={() => submitPokemon(pokemon)} >SubmitPokemon</button>
        </div>
    );
};
export default CatchPokeDialog;