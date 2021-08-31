import { render, screen } from "@testing-library/react";
import Context from "../Context";
import MyPokemonsPage from "./MyPokemonsPage";

jest.mock('../components/MyPokeCard', () => (props) => {
    return (<div>
        {props.name}
    </div>);
});

const customRender = (ui, { providerProps, ...renderOptions }) => {
    return render(
        <Context.Provider {...providerProps}>{ui}</Context.Provider>,
        renderOptions,
    );
}

test('MyPokemonsPage shows appropriate title', () => {
    const providerProps = {
        value: { pokecaught: [] }
    };
    customRender(
        <MyPokemonsPage />, { providerProps }
    )
    expect(screen.getByText('My Pokemon Page')).toBeInTheDocument();
});

test('MyPokemonsPage shows pokemons I own in context.pokeowned', () => {
    const sampleOwned = [{nickname: 'bulbasaur'}, {nickname: 'charmander'}, {nickname: 'squirtle'}];
    const providerProps = {
        value: { pokecaught: sampleOwned }
    };
    customRender(
        <MyPokemonsPage />, { providerProps }
    );

    expect(screen.getByText('charmander')).toBeInTheDocument();
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('squirtle')).toBeInTheDocument();
})