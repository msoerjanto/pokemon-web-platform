import React, { useState } from "react";
import styled from '@emotion/styled'

const CatchPokeButton = styled.button``;
const PokemonCaughtDialog = styled.div``;

function CatchPokeDialogComponent(props) {
    const [nickname, setNickname] = useState(props.pokemon.name);

    if (props.catchingPokemon) {
        // catching pokemon, first check if still loading
        if (props.loading) {
            return <>Loading</>
        } else {
            if (props.pokemonCaught) {
                // prompt for nickanme
                // text: Gotcha! x was caught!
                const handleSubmit = (event) => {
                    event.preventDefault();
                    props.submitPokemon({
                        nickname,
                        name: props.pokemon.name,
                        image: props.pokemon.sprites.front_default
                    });
                    setNickname("");
                };

                return (
                    <>
                        <h3>Gotcha! {props.pokemon.name} was caught!</h3>
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
                        <CatchPokeButton className="btn btn-secondary btn-lg" onClick={() => props.catchPokemon(props.pokemon)}>
                            CATCH AGAIN
                        </CatchPokeButton>
                    </>)
            }
        }
    } else {
        // not catching pokemon just return catch button
        return (
            <CatchPokeButton className="btn btn-secondary btn-lg" onClick={() => props.catchPokemon(props.pokemon)}>
                CATCH
            </CatchPokeButton>
        );
    }
}

export default CatchPokeDialogComponent;