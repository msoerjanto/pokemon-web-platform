import React from 'react';
import styled from '@emotion/styled'
import { Link } from 'react-router-dom';
import PokeDisplay from './PokeDisplay';


const ListPokeCard = styled.div`
    padding: 8px
`;

export default function ListPokeCardComponent({ image, name }) {
    return (
        <Link to={`pokemons/${name}`} style={{ textDecoration: 'none' }}>
            <ListPokeCard className="d-flex flex-column">
                <PokeDisplay name={name} image={image} />
            </ListPokeCard>
        </Link >
    );
}

