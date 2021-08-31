import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import Context from "../Context";
import { GET_POKEMON_QUERY } from "../graphql/queries/getPokemon";
import PokemonDetailsPage from "./PokemonDetailsPage";

const mockPokeDialogStub = jest.fn();

jest.mock('../components/CatchPokeDialog', () => (props) => {
    mockPokeDialogStub(props);
    return (
        <div>
            <button onClick={() => props.submitPokemon(props.pokemon)} >SubmitPokemon</button>
            <button onClick={() => props.catchPokemon()}>CatchPokemon</button>
        </div>
    );
});

const customRender = (ui, { providerProps, ...renderOptions }) => {
    return render(
        <Context.Provider {...providerProps}>{ui}</Context.Provider>,
        renderOptions,
    );
}

const mocks = [
    {
        request: {
            query: GET_POKEMON_QUERY,
            variables: {
                name: 'bulbasaur'
            }
        },
        result: {
            data: {
                pokemon: {
                    name: "bulbasaur",
                    sprites: {
                        front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
                        __typename: "Sprite"
                    },
                    __typename: "Pokemon"
                }
            }
        }
    }
]

const errorMessage = 'Something went wrong';
const errorMock = [
    {
        request: {
            query: GET_POKEMON_QUERY,
            variables: {
                name: 'bulbasaur'
            }
        },
        error: new Error(errorMessage)
    }
];

test('PokemonDetailsPage shows Loading text when fetch from API is not complete', () => {
    render(
        <MockedProvider mocks={mocks}>
            <MemoryRouter initialEntries={["/pokemons/bulbasaur"]}>
                <Route path="/pokemons/:name">
                    <PokemonDetailsPage />
                </Route>
            </MemoryRouter>
        </MockedProvider>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('PokemonDetailsPage shows Error! and message when there is an error fetching data from graphql API', async () => {
    render(
        <MockedProvider mocks={errorMock}>
            <MemoryRouter initialEntries={["/pokemons/bulbasaur"]}>
                <Route path="/pokemons/:name">
                    <PokemonDetailsPage />
                </Route>
            </MemoryRouter>
        </MockedProvider>
    );
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(screen.getByText(`Error! ${errorMessage}`)).toBeInTheDocument();
});

test('PokemonDetailsPage fetches data from graphql API and displays the result', async () => {
    render(
        <MockedProvider mocks={mocks}>
            <MemoryRouter initialEntries={["/pokemons/bulbasaur"]}>
                <Route path="/pokemons/:name">
                    <PokemonDetailsPage />
                </Route>
            </MemoryRouter>
        </MockedProvider>
    );
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(screen.getByText("bulbasaur")).toBeInstanceOf(HTMLHeadingElement);
});

test('PokemonDetailsPage should pass proper props to CatchPokeDialog', async () => {
    render(
        <MockedProvider mocks={mocks}>
            <MemoryRouter initialEntries={["/pokemons/bulbasaur"]}>
                <Route path="/pokemons/:name">
                    <PokemonDetailsPage />
                </Route>
            </MemoryRouter>
        </MockedProvider>
    );
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(mockPokeDialogStub).toHaveBeenCalledWith(
        expect.objectContaining(
            {
                loading: false,
                catchingPokemon: false,
                pokemon: mocks[0].result.data.pokemon,
                pokemonCaught: false
            }
        )
    );
});

test('PokemonDetailsPage should call context catchPokemon() function', async () => {
    const stub = jest.fn();
    const providerProps = {
        value: { catchPokemon: stub }
    };
    customRender(
        <MockedProvider mocks={mocks}>
            <MemoryRouter initialEntries={["/pokemons/bulbasaur"]}>
                <Route path="/pokemons/:name">
                    <PokemonDetailsPage />
                </Route>
            </MemoryRouter>
        </MockedProvider>
        , { providerProps });
    await new Promise(resolve => setTimeout(resolve, 0));
    fireEvent.click(screen.getByText('SubmitPokemon'));
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(stub).toHaveBeenCalled();
});

test('PokemonDetailsPage should be able to setPokemonCaught based on user events', async () => {
    render(
        <MockedProvider mocks={mocks}>
            <MemoryRouter initialEntries={["/pokemons/bulbasaur"]}>
                <Route path="/pokemons/:name">
                    <PokemonDetailsPage />
                </Route>
            </MemoryRouter>
        </MockedProvider>
    );

    let success = 0;
    let fail = 0;
    let countIter = 0;
    while (!success || !fail && countIter < 10) {
        await new Promise(resolve => setTimeout(resolve, 0));
        fireEvent.click(screen.getByText('CatchPokemon'));
        await new Promise(resolve => setTimeout(resolve, 1200));
        const lastPokemonCaught = mockPokeDialogStub.mock.calls[mockPokeDialogStub.mock.calls.length-1][0].pokemonCaught;
        if (lastPokemonCaught) {
            success++;
        } else {
            fail++;
        }
        countIter++;
    }
    if (countIter >= 10) {
        throw new Exception('Should not take this many tries...');
    }
}, 10000);



