import React, { useState } from 'react';
import { Navbar, Nav, Offcanvas } from 'react-bootstrap';
import { borrarSesion, getRol, getToken } from '../utilidades/Sessionutil';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';

const BarraMenu = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  return (
    <Navbar expand="lg" variant="fondo" className="navbar navbar-expand-lg fixed-top azul-blanco" >
      <div className='container-fluid'>
        <Navbar.Brand className="navbar-brand texto-h1" href="/inicio">KHAT ACADEMIC</Navbar.Brand>
        <Navbar className="navbar-toggler fas fa-bars azul-blanco" aria-controls="offcanvasNavbar" onClick={() => setShowOffcanvas(!showOffcanvas)} />
        <div className="collapse navbar-collapse">
          <NavLink classNameNav="navbar-nav ms-auto mb-2 mb-lg-0" />
        </div>
        <Offcanvas show={showOffcanvas} onHide={() => setShowOffcanvas(false)} placement="end" target="#offcanvasNavbar">
          <Offcanvas.Header className="azul-blanco" style={{ color: '#fff' }} closeButton>
            <Offcanvas.Title>OPCIONES</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="offcanvas-body azul-blanco">
            <NavLink classNameNav="navbar-nav justify-content-end flex-grow-1 pe-3" />
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </Navbar>
  );
};

export default BarraMenu;

const navLinkStyle = {
  marginRight: '10px',
  color: '#fff'
};


const NavLink = ({ classNameNav }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const token = getToken();

  const handleCerrarSesion = () => {
    borrarSesion();
    navigate('/');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };


  return (
    <Nav className={classNameNav}>
      <Nav.Link href="/inicio" style={navLinkStyle}><i className="fas fa-home"></i> Inicio</Nav.Link>
      {getRol() === 'ADMINISTRADOR' && <Nav.Link href="/admin/usuarios" style={navLinkStyle}><i className="fas fa-user-plus"></i> Registrar usuario</Nav.Link>}
      {getRol() === 'ADMINISTRADOR' && <Nav.Link href="/admin/matricular" style={navLinkStyle}><i className="fas fa-user-graduate"></i> Matricular</Nav.Link>}
      {getRol() === 'ADMINISTRADOR' && <Nav.Link href="/admin/docentes" style={navLinkStyle}><i className="fas fa-chalkboard-teacher"></i> Asignar docente</Nav.Link>}
      {getRol() === 'ESTUDIANTE' && <Nav.Link href="/estudiantes/laboratorio" style={navLinkStyle}><i className="fas fa-terminal"></i> Laboratorio remoto</Nav.Link>}
      {token && <Nav.Link href="/" onClick={handleCerrarSesion} style={navLinkStyle}><i className="fas fa-sign-out-alt"></i> Cerrar sesión</Nav.Link>}
    </Nav>
  );
};