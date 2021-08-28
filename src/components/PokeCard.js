import React from 'react';
import withContext from '../withContext';
import styled from '@emotion/styled'
import { Link, useRouteMatch } from 'react-router-dom';


const PokeCard = styled.div`

    padding: 8px
`;

const PokeCardName = styled.strong`
    text-align: center;
`

function PokeCardComponent(props) {
    console.log('pokemon:', props.pokemon);
    let match = useRouteMatch();
    console.log('match url:', match.url);
    return (

        <Link to={`${match.url}/${props.pokemon.name}`} style={{ textDecoration: 'none' }}>
            <PokeCard className="d-flex flex-column">
                <img src={props.pokemon.image} />
                <PokeCardName>
                    {props.pokemon.name}
                </PokeCardName>
            </PokeCard>
        </Link >

    );
}

export default withContext(PokeCardComponent);