import { useState } from "react";
import styled from '@emotion/styled'

const CatchPokeButton = styled.button``;
const PokemonCaughtDialog = styled.div``;

export default function PokeCatchResult({
    pokemon,
    pokemonCaught,
    submitPokemon,
    invalidName,
    retry}) {
    const [nickname, setNickname] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        submitPokemon({
            nickname,
            name: pokemon.name,
            image: pokemon.sprites.front_default
        });
        setNickname("");
    };

    if (pokemonCaught) {
        // prompt for nickanme
        // text: Gotcha! x was caught!
        return (
            <>
                <h3>Gotcha! {pokemon.name} was caught!</h3>
                <form onSubmit={handleSubmit}>
                    <PokemonCaughtDialog class="form-group">
                        {invalidName && (<label>Invalid Name, you already have a pokemon with the same name</label>)}
                        <label>Nickname</label>
                        <input
                            type="text"
                            className="form-control"
                            value={nickname}
                            onChange={e => setNickname(e.target.value)}
                            placeholder="Enter Pokemon nickname" />
                        <input type="submit" value="Add to my Pokemon List" />
                    </PokemonCaughtDialog>
                </form>
            </>);
    } else {
        // prompt to try again
        // text: Oh, no! The Pokemon broke free!
        return (
            <>
                <h3>Oh, no! The Pokemon broke free!</h3>
                <CatchPokeButton className="btn btn-secondary btn-lg" onClick={retry}>
                    TRY AGAIN
                </CatchPokeButton>
            </>)
    }
}