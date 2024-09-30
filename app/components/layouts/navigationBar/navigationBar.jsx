'use client';
import './navigationBar.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { LiaBarsSolid } from 'react-icons/lia';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

function NavigationBar() {
  const pathname = usePathname();
  const [showDropDown, setShowDropDown] = useState(false);
  console.log(pathname);

  const navbarColor =
    pathname === '/'
      ? { backgroundColor: 'transparent' }
      : { backgroundColor: 'black' };
  const handleMouseOver = () => setShowDropDown(true);
  const handleMouseLeave = () => setShowDropDown(false);
  return (
    <div className="navigation" style={navbarColor}>
      <Navbar className="main">
        <Container className="main-container">
          <Navbar.Brand className="navbar-brand" href="./">
            <img
              src="https://mplpl.sakura.ne.jp/wp/wp-content/uploads/2022/03/logo.png"
              style={{ width: '170px', height: 'auto', marginBottom: '15px' }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span>
              <LiaBarsSolid />
            </span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end flex-grow-1 pe-3 navbar-nav_">
              <Nav.Link className="nav-link_" href="/news">
                NEWS
              </Nav.Link>
              <Nav.Link className="nav-link_" href="/works">
                WORKS
              </Nav.Link>
              <Nav.Link className="nav-link_" href="/projects">
                PROJECTS
              </Nav.Link>
              <NavDropdown
                title="ARTISTS"
                id="basic-nav-dropdown"
                flip="false"
                boundary="window"
                show={showDropDown}
                onMouseEnter={handleMouseOver}
                onMouseLeave={handleMouseLeave}
              >
                <NavDropdown.Item className="navbar-dropdown-item" href="/">
                  M++ DANCERS
                </NavDropdown.Item>
                <NavDropdown.Item className="navbar-dropdown-item" href="/">
                  MINORU FUJIMOTO
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link className="nav-link_" href="/info">
                INFO
              </Nav.Link>
              <Nav.Link className="nav-link_" href="/who">
                WHO WE ARE
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
