import React from 'react';
import { Link } from "react-router-dom";
import styled from '@emotion/styled'

const NavBarLink = styled.li`
    padding: 12px;
`;

export default function NavBarLinkComponent(props) {
    return (
        <li className="nav-item">
            <Link to={props.to} className="navbar-item" style={{ textDecoration: 'none' }}>
                <NavBarLink>{props.description}</NavBarLink>
            </Link>
        </li>
    );
}