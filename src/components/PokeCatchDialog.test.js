import { fireEvent, render, screen } from "@testing-library/react";
import PokeCatchDialog from "./PokeCatchDialog";


const mockPokeCatchResultStub = jest.fn();
jest.mock('./PokeCatchResult', () => (props) => {
    mockPokeCatchResultStub(props);
    return (<div>PokeCatchResult</div>);
});

test('PokeCatchDialog shows Catching text when catching flag is true', () => {
    render(
        <PokeCatchDialog catching={true} />
    );
    expect(screen.getByText('Catching...')).toBeInTheDocument();
});

test('PokeCatchDialog shows Catch button when showCatchResult is false and catching is false', () => {
    render(
        <PokeCatchDialog catching={false} showCatchResult={false} />
    );
    expect(screen.getByText('CATCH')).toBeInstanceOf(HTMLButtonElement);
});

test('PokeCatchDialog invokes catchPokemon props when Catch button is clicked', () => {
    const stub = jest.fn();
    const pokemon = {name: 'missingno'};
    render(
        <PokeCatchDialog
            catching={false}
            showCatchResult={false}
            catchPokemon={stub}
            pokemon={pokemon}
        />
    );

    fireEvent.click(screen.getByText('CATCH'));
    
    expect(stub).toHaveBeenCalledWith(pokemon);
});

test('PokeCatchDialog renders PokeCatchResult component when showCatchResult is true and catching is false', () => {
    const pokemon = {name: 'missingno'};
    const stub = jest.fn();
    render(
        <PokeCatchDialog
            catching={false}
            showCatchResult={true}
            pokemon={pokemon}
            pokemonCaught={true}
            invalidName={true}
            catchPokemon={stub}
            submitPokemon={stub}
        />
    );

    expect(mockPokeCatchResultStub).toHaveBeenCalledWith(expect.objectContaining({
        pokemon: pokemon,
        pokemonCaught: true,
        submitPokemon: stub,
        invalidName: true
    }));
});