import React from "react";
import { Navbar, Nav, Container} from 'react-bootstrap';

export const NavbarComp = () => {
    return(
        <Navbar bg="dark" expand="lg" variant="dark" className="sticky-top">
        <Container fluid>
          <Navbar.Brand href="/">Sea Monsters</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/articles">Articles</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}