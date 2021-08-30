import React from 'react';
import { Link } from "react-router-dom";
import styled from '@emotion/styled'

const NavBarLink = styled.div`
    padding: 12px;
`;

export default function NavBarLinkComponent({to = "/", description = "Home"}) {
    return (
        <li className="nav-item">
            <NavBarLink >
                <Link className="navbar-item" to={to} style={{ textDecoration: 'none' }}>
                    {description}
                </Link>
            </NavBarLink>
        </li>
    );
}