import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faBars, faDumbbell, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons"
import { useState } from 'react';

export default function Header ({ showMenu, setShowMenu}) {
 
  const [fadeOut, setFadeOut] = useState(false);

  const handleMenu = () => {
    setFadeOut(!fadeOut);
    setShowMenu(!showMenu);
  };

  return (
    <Nav className='f2 bg-dark d-flex justify-content-between fixed-top'>
      <NavDropdown  title="Sweat Check" id="nav-dropdown" className='ps-3 d-flex align-items-center justify-content-center'>
        <NavDropdown.Item >Feed 1</NavDropdown.Item>
        <NavDropdown.Item >Feed 2</NavDropdown.Item>
        <NavDropdown.Item >Feed 3</NavDropdown.Item>
      </NavDropdown>
      <div className='d-flex pe-3'>
        <Nav.Item className='p-2 px-3'>
          <Link to={'/conversations'}>
            <FontAwesomeIcon icon={faMessage} style={{color: "#ffffff",}} className='message-icon'/>
          </Link>
        </Nav.Item>
        <Nav.Item className='p-2'>
          <Nav.Link >            
            <FontAwesomeIcon
              icon={showMenu ? faXmark : faBars}
              style={{ color: "#ffffff" }}
              className={`menu-icon logospin ${fadeOut ? 'fade-out' : 'fade-in'}`}
              onClick={handleMenu}
              onAnimationEnd={() => setFadeOut(false)}
            />
          </Nav.Link>
        </Nav.Item>             
      </div>
    </Nav>
  );
};
