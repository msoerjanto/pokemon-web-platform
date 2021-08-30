import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBar from "./NavBar";

jest.mock('./NavBarLink');

test('NavBar shows link to Pokemon List page', () => {
    render(
        <NavBar />
    );
    expect(screen.getByText('Pokemon List')).toBeInTheDocument();
});

test('NavBar shows link to My Pokemons page', () => {
    render(
        <NavBar />
    );
    expect(screen.getByText('My Pokemons')).toBeInTheDocument();
});