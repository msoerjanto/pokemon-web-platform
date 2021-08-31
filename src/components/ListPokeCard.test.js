import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ListPokeCard from "./ListPokeCard";

const mockStub = jest.fn();

jest.mock('./PokeDisplay', () => (props) => {
    mockStub(props);
    return <></>;
});

test('ListPokeCard contains link to pokemons/:name', () => {
    render(<MemoryRouter>
        <ListPokeCard name={'bulbasaur'} />
    </MemoryRouter>
    );
    expect(screen.getByRole('link')).toHaveAttribute("href", '/pokemons/bulbasaur');
});

test('ListPokeCard passes name and image props to PokeDisplay component', () => {
    render(<MemoryRouter>
        <ListPokeCard name='bulbasaur' image='myImage'/>
    </MemoryRouter>
    );
    expect(mockStub).toHaveBeenCalledWith(expect.objectContaining({
        name: 'bulbasaur',
        image: 'myImage'
    }));
});

