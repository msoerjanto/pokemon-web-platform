import React from 'react';
import styled from '@emotion/styled'
import { Link, useRouteMatch } from 'react-router-dom';


const PokeCard = styled.div`

    padding: 8px
`;

const PokeCardName = styled.strong`
    text-align: center;
`

export default function PokeCardComponent(props) {
    return (

        <Link to={`pokemons/${props.pokemon.name}`} style={{ textDecoration: 'none' }}>
            <PokeCard className="d-flex flex-column">
                <img src={props.pokemon.image} />
                <PokeCardName>
                    {props.pokemon.name}
                </PokeCardName>
            </PokeCard>
        </Link >

    );
}

