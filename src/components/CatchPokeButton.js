import React from "react";
import styled from '@emotion/styled'
import withContext from "../withContext";

const CatchPokeButton = styled.button``;

function CatchPokeButtonComponent(props) {    
    return (
        <CatchPokeButton className="btn btn-secondary btn-lg" onClick={() => props.catchPokemon(props.pokemon)}>
            CATCH
        </CatchPokeButton>
    );
}

export default withContext(CatchPokeButtonComponent);