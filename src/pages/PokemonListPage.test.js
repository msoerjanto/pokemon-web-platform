import { MockedProvider } from '@apollo/client/testing';
import PokemonListPage from "./PokemonListPage";
import { GET_POKEMONS_QUERY } from "../graphql/queries/getPokemons";
import { fireEvent, render, screen } from '@testing-library/react';

jest.mock('../components/ListPokeCard');
jest.mock('../components/PokeOwned');
jest.mock('../components/PageControl');

const apiResult = {
    "data": {
        "pokemons": {
            "count": 1118,
            "next": "https://pokeapi.co/api/v2/pokemon/?offset=23&limit=3",
            "previous": "https://pokeapi.co/api/v2/pokemon/?offset=17&limit=3",
            "nextOffset": 23,
            "prevOffset": 17,
            "results": [
                {
                    "url": "https://pokeapi.co/api/v2/pokemon/21/",
                    "name": "spearow",
                    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/21.png",
                    "__typename": "PokemonItem"
                },
                {
                    "url": "https://pokeapi.co/api/v2/pokemon/22/",
                    "name": "fearow",
                    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/22.png",
                    "__typename": "PokemonItem"
                },
                {
                    "url": "https://pokeapi.co/api/v2/pokemon/23/",
                    "name": "ekans",
                    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/23.png",
                    "__typename": "PokemonItem"
                }
            ],
            "__typename": "PokemonList"
        }
    },
};

const refetchResult = {
    "data": {
        "pokemons": {
            "count": 1118,
            "next": "https://pokeapi.co/api/v2/pokemon/?offset=31&limit=1",
            "previous": "https://pokeapi.co/api/v2/pokemon/?offset=29&limit=1",
            "nextOffset": 31,
            "prevOffset": 29,
            "results": [
                {
                    "url": "https://pokeapi.co/api/v2/pokemon/31/",
                    "name": "nidoqueen",
                    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/31.png",
                    "__typename": "PokemonItem"
                }
            ],
            "__typename": "PokemonList"
        }
    }
};

const mocks = [{
    request: {
        query: GET_POKEMONS_QUERY,
        variables: {
            limit: 45,
            offset: 0
        }
    },
    result: apiResult
}];


let queryCalled = false;
const refetchMocks = [{
    request: {
        query: GET_POKEMONS_QUERY,
        variables: {
            limit: 45,
            offset: 0
        }
    },
    newData: () => {
        if (queryCalled) {
            return refetchResult;
        } else {
            queryCalled = true;
            return apiResult;
        }
    }
}];


const errorMessage = 'Something went wrong';
const errorMock = [
    {
        request: {
            query: GET_POKEMONS_QUERY,
            variables: {
                limit: 45,
                offset: 0
            }
        },
        error: new Error(errorMessage)
    }
];

test('PokemonListPage shows Loading text when fetch from API is not complete', () => {
    render(
        <MockedProvider mocks={mocks}>
            <PokemonListPage />
        </MockedProvider>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('PokemonListPage shows Error! and message when there is an error fetching data from graphql API', async () => {
    render(
        <MockedProvider mocks={errorMock}>
            <PokemonListPage />
        </MockedProvider>
    );

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(screen.getByText(`Error! ${errorMessage}`)).toBeInTheDocument();
});

test('PokemonListPage fetches data from graphql API and displays the result', async () => {
    render(
        <MockedProvider mocks={mocks}>
            <PokemonListPage />
        </MockedProvider>
    );

    await new Promise(resolve => setTimeout(resolve, 0));

    apiResult.data.pokemons.results.forEach(poke => {
        expect(screen.getByText(poke.name)).toBeInTheDocument();
        expect(screen.getByText(poke.image)).toBeInTheDocument();
    });

});

test('PokemonListPage passes setOffset function to PageControl so that it may refetch data from graphql API', async () => {
    render(
        <MockedProvider mocks={refetchMocks}>
            <PokemonListPage />
        </MockedProvider>
    );

    await new Promise(resolve => setTimeout(resolve, 0));

    // click the mock PageControl button to trigger setOffset
    fireEvent.click(screen.getByText('Page Control'));

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(screen.getByText(refetchResult.data.pokemons.results[0].name)).toBeInTheDocument();
    expect(screen.getByText(refetchResult.data.pokemons.results[0].image)).toBeInTheDocument();
});