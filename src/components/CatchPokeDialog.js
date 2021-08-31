import React, { useState } from "react";
import styled from '@emotion/styled'

const CatchPokeButton = styled.button``;
const PokemonCaughtDialog = styled.div``;

function CatchPokeDialogComponent({
    loading = false,
    catchingPokemon = false,
    pokemonCaught = false,
    pokemon,
    catchPokemon
}) {
    const [nickname, setNickname] = useState(pokemon.name);

    if (catchingPokemon) {
        // catching pokemon, first check if still loading
        if (loading) {
            return <>Loading</>
        } else {
            if (pokemonCaught) {
                // prompt for nickanme
                // text: Gotcha! x was caught!
                const handleSubmit = (event) => {
                    event.preventDefault();
                    submitPokemon({
                        nickname,
                        name: pokemon.name,
                        image: pokemon.sprites.front_default
                    });
                    setNickname("");
                };

                return (
                    <>
                        <h3>Gotcha! {pokemon.name} was caught!</h3>
                        <form onSubmit={handleSubmit}>
                            <PokemonCaughtDialog class="form-group">
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
                        <CatchPokeButton className="btn btn-secondary btn-lg" onClick={() => catchPokemon(pokemon)}>
                            CATCH AGAIN
                        </CatchPokeButton>
                    </>)
            }
        }
    } else {
        // not catching pokemon just return catch button
        return (
            <CatchPokeButton className="btn btn-secondary btn-lg" onClick={() => catchPokemon(pokemon)}>
                CATCH
            </CatchPokeButton>
        );
    }
}

export default CatchPokeDialogComponent;