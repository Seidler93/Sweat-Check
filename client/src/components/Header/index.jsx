import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faBars, faDumbbell, faCheck } from "@fortawesome/free-solid-svg-icons"
import { useState } from 'react';

export default function Header ({ showMenu, setShowMenu}) {
 
  const handleMenu = () => setShowMenu(!showMenu);

  return (
    <Nav className='bg-dark d-flex justify-content-between fixed-top'>
      <NavDropdown  title="Sweat Check" id="nav-dropdown" className='ps-2 d-flex align-items-center justify-content-center'>
        <NavDropdown.Item >Feed 1</NavDropdown.Item>
        <NavDropdown.Item >Feed 2</NavDropdown.Item>
        <NavDropdown.Item >Feed 3</NavDropdown.Item>
      </NavDropdown>
      <div className='d-flex'>
        <Nav.Item className='p-1'>
          <Link to={'/conversations'}>
            <FontAwesomeIcon icon={faMessage} style={{color: "#ffffff",}} className='message-icon'/>
          </Link>
        </Nav.Item>
        <Nav.Item className='p-1'>
          <Nav.Link >
            <FontAwesomeIcon icon={faBars} style={{color: "#ffffff",}} className='menu-icon' onClick={handleMenu}/>
          </Nav.Link>
        </Nav.Item>             
      </div>
    </Nav>
  );
};
