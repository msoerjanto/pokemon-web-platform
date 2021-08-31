import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

jest.mock('./pages/PokemonListPage', () => (props) => {
    return (<div>
        Pokemon List Page
    </div>);
});

jest.mock('./pages/MyPokemonsPage', () => (props) => {
    return (<div>
        My Pokemons Page
    </div>);
});

jest.mock('./pages/PokemonDetailsPage', () => (props) => {
    return (<div>
        Pokemon Details Page
    </div>);
});

test('App navigates properly', () => {
    render(
        <MemoryRouter initialEntries={['/']}>
            <App />
        </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Pokemon List'));
    expect(screen.getByText('Pokemon List Page')).toBeInTheDocument();

    fireEvent.click(screen.getByText('My Pokemons'));
    expect(screen.getByText('My Pokemons Page')).toBeInTheDocument();
});