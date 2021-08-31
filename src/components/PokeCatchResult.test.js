import { fireEvent, render, screen } from "@testing-library/react";
import PokeCatchResult from "./PokeCatchResult";

test('PokeCatchResult shows success text when pokemonCaught is true', () => {
    render(
        <PokeCatchResult pokemonCaught />
    );
    expect(screen.getByText('Gotcha! Pokemon was caught!')).toBeInTheDocument();
});

test('PokeCatchResult shows success text with pokemon name when pokemonCaught is true and pokemon exists', () => {
    render(
        <PokeCatchResult pokemonCaught pokemon={{ name: 'bulbasaur' }} />
    );
    expect(screen.getByText('Gotcha! bulbasaur was caught!')).toBeInTheDocument();
});

test('PokeCatchResult shows invalid name text when pokemonCaught is true and invalidName is true', () => {
    render(
        <PokeCatchResult pokemonCaught invalidName />
    );
    expect(screen.getByText('Invalid Name, you already have a pokemon with the same name')).toBeInTheDocument();
});

test('PokeCatchResult shows Try Again button when pokemonCaught is false', () => {
    render(
        <PokeCatchResult />
    );
    expect(screen.getByText('TRY AGAIN')).toBeInTheDocument();
});

test('PokeCatchResult calls retry function when Try Again button is clicked', () => {
    const retryStub = jest.fn();
    render(
        <PokeCatchResult retry={retryStub}/>
    );

    fireEvent.click(screen.getByText('TRY AGAIN'));

    expect(retryStub).toHaveBeenCalled();
});

test('PokeCatchResult calls submitPokemon function when we submit the form', () => {
    const submitStub = jest.fn();
    const pokemon = { name: 'missingno', sprites: { front_default: 'image'}};
    render(
      <PokeCatchResult pokemonCaught submitPokemon={submitStub} pokemon={pokemon} />  
    );
    
    fireEvent.change(screen.getByPlaceholderText('Enter Pokemon nickname'), {target: {value: 'nickname'}});
    fireEvent.click(screen.getByDisplayValue('Add to my Pokemon List'));

    expect(submitStub).toHaveBeenCalledWith(expect.objectContaining({
        name: 'missingno',
        image: 'image',
        nickname: 'nickname' 
    }));
});