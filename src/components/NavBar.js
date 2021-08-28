import React from "react";
import { css } from '@emotion/react';
import NavBarLink from "./NavBarLink";

const links = [
    { to: '/pokemons', description: 'Pokemon List' },
    { to: '/mypokemons', description: 'My Pokemons' }
];

export default function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between">
            <div className="navbar-brand d-flex align-items-center col-md-4">
                <strong>Pokemon Web Platform</strong>
            </div>
            <ul className="navbar-nav">
                {links.map(link => <NavBarLink to={link.to} description={link.description} />)}
            </ul>
        </nav>
    );
}