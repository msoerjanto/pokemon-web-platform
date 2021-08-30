import React from "react";
import NavBarLink from "./NavBarLink";

const links = [
    { to: '/pokemons', description: 'Pokemon List' },
    { to: '/mypokemons', description: 'My Pokemons' }
];

export default function NavBar() {
    return (
        <nav className="navbar d-flex justify-content-between">
            <div className="navbar-brand d-flex align-items-center col-md-4">
                <strong>Pokemon Web Platform</strong>
            </div>
            <ul className="navbar-nav d-flex flex-row">
                {links.map(link => <NavBarLink key={link.to} to={link.to} description={link.description} />)}
            </ul>
        </nav>
    );
}