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
    if (props.owned) {
        return (
            <PokeCard className="d-flex flex-column">
                <img src={props.image} />
                <PokeCardName>
                    {props.name}
                </PokeCardName>
                <button className="btn btn-primary" onClick={() => props.release(props.name)}>
                    Release
                </button>
            </PokeCard>
        );
    }
    return (

        <Link to={`pokemons/${props.name}`} style={{ textDecoration: 'none' }}>
            <PokeCard className="d-flex flex-column">
                <img src={props.image} />
                <PokeCardName>
                    {props.name}
                </PokeCardName>
            </PokeCard>
        </Link >

    );
}

