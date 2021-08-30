import React from 'react';
import { Link } from "react-router-dom";
import styled from '@emotion/styled'

const NavBarLink = styled.div`
    padding: 12px;
`;

export default function NavBarLinkComponent(props) {
    return (
        <li className="nav-item">
            <NavBarLink >
                <Link className="navbar-item" to={props.to ? props.to : "/"} style={{ textDecoration: 'none' }}>
                    {props.description}
                </Link>
            </NavBarLink>
        </li>
    );
}