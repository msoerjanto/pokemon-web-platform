import { render } from "@testing-library/react";
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

test('App renders', () => {
    render(<App />);
});