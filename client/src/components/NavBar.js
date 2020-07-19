import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Nav, NavItem,NavLink } from 'reactstrap';

class NavBar extends Component {
    render() {
        return (
            <>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Magazine</NavbarBrand>
                    <NavbarToggler />
                    <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink href="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/write-article">Write Article</NavLink>
                            </NavItem>
                        </Nav>
                </Navbar>
            </>
        );
    }
}

export default NavBar;