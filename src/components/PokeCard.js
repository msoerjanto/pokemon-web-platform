import React from 'react';
import styled from '@emotion/styled'
import { Link, useRouteMatch } from 'react-router-dom';


const PokeCard = styled.div`

    padding: 8px
`;

const PokeCardName = styled.strong`
    text-align: center;
`

export default function PokeCardComponent({owned = false, image, name, release}) {
    if (owned) {
        return (
            <PokeCard className="d-flex flex-column">
                <img src={image} />
                <PokeCardName>
                    {name}
                </PokeCardName>
                <button className="btn btn-primary" onClick={() => release(name)}>
                    Release
                </button>
            </PokeCard>
        );
    }
    return (

        <Link to={`pokemons/${name}`} style={{ textDecoration: 'none' }}>
            <PokeCard className="d-flex flex-column">
                <img src={image} alt={name} />
                <PokeCardName>
                    {name}
                </PokeCardName>
            </PokeCard>
        </Link >

    );
}

