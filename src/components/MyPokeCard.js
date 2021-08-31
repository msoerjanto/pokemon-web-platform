import React from 'react';
import styled from '@emotion/styled';
import PokeDisplay from './PokeDisplay';

const MyPokeCard = styled.div`
    padding: 8px
`;

export default function MyPokeCardComponent({name, image, release}) {
    return (
        <MyPokeCard className="d-flex flex-column">
            <PokeDisplay name={name} image={image}/>
            <button className="btn btn-primary" onClick={() => release(name)}>
                Release
            </button>
        </MyPokeCard>
    );
}