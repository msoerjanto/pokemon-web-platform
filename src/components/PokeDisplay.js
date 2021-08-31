import React from 'react';
import styled from '@emotion/styled'

const PokeName = styled.strong`
    text-align: center;
`

export default function PokeDisplay({ image, name }) {
    return (
        <>
            <img src={image} />
            <PokeName>
                {name}
            </PokeName>
        </>
    );
}