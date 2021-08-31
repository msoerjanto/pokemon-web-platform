import React from "react";
import NavBarLink from "./NavBarLink";
import styled from '@emotion/styled';
import pokeball from "../images/pokeball.png";

const links = [
    { to: '/pokemons', description: 'Pokemon List' },
    { to: '/mypokemons', description: 'My Pokemons' }
];

const NavBar = styled.nav`
    margin-bottom: 48px;
    position: fixed; /* Set the navbar to fixed position */
    top: 0; /* Position the navbar at the top of the page */
    width: 100%; /* Full width */
`;

const PokeBallLogo = styled.img`
    height: 32px;
    margin: 8px;
`;

const BrandHeading = styled.h1`
    height: 24px;
    font-family: Sora;
`;

export default function NavBarComponent() {
    return (
        <NavBar className="navbar navbar-light bg-light d-flex justify-content-between">
            <div className="navbar-brand d-flex align-items-center col-md-4">
                <PokeBallLogo src={pokeball} />
                <BrandHeading>PokeWeb</BrandHeading>
            </div>
            <ul className="navbar-nav d-flex flex-row">
                {links.map(link => <NavBarLink key={link.to} to={link.to} description={link.description} />)}
            </ul>
        </NavBar>
    );
}