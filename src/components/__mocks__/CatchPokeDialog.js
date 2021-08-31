import React from 'react';
const CatchPokeDialog = (props) => {
    if (props.stub) {
        props.stub(props);
    }
    return (
        <div>
            <button onClick={() => props.submitPokemon(props.pokemon)} >SubmitPokemon</button>
            <button onClick={() => props.catchPokemon()}>Catch Pokemon</button>
        </div>
    );
};
export default CatchPokeDialog;