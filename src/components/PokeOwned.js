import React from "react";
import withContext from "../withContext";
import styled from '@emotion/styled'

const PokeOwned = styled.div`

`;

export default function PokeOwnedComponent(props) {
    return (
        <PokeOwned className="d-flex flex-column align-items-center">
            <h1>{props.caught.length}</h1>
            <h2>Owned</h2>
        </PokeOwned>
    );
}