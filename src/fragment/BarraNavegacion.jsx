import React, { useEffect, useState } from 'react';
import { Obtener } from '../hooks/Conexion';
import { borrarSesion, getToken, getUser,getRol } from '../utilidades/Sessionutil';
import mensajes from '../utilidades/Mensajes';
import { useParams, useNavigate } from 'react-router-dom';
function BarraNavegacion() {
  const navigate = useNavigate();
  const [llasignaturas, setLlasignaturas] = useState(false);//para listar asignaturas
  const [asignaturas, setasignaturas] = useState([]);//para listar asignaturas
  if (!llasignaturas) {
    setasignaturas(getUser());
    setLlasignaturas(true);
  }
  const handleCerrarSesion = () => {
    borrarSesion(); // Llama al método para cerrar sesión
    navigate('/'); // Redirige a la página de inicio después de cerrar sesión
  };

  useEffect(() => {
    setLlasignaturas(false);
  }, []);
  return (
    <nav className="navbar navbar-light fixed-top" style={{ background: "#212A3E" }}>
      <div className="container-fluid" style={{ background: "#212A3E" }}>
        <a className="navbar-brand" style={{ color: "#F1F6F9" }} href="#">{asignaturas.nombres + " " + asignaturas.apellidos}</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="#F1F6F9" class="bi bi-list-ul" viewBox="0 0 14 14">
            <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
          </svg>
        </button>
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" style={{ background: "#212A3E" }}>
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel" ></h5>

            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body" >
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3" >
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/inicio" style={{ color: '#F1F6F9' }}>Inicio</a>
              </li>
               {/**ESTUDIANTE*/}
              {getRol() === "ESTUDIANTE" && (
                <>
                    <li className="nav-item">
                <a className="nav-link" href="/estudiantes/laboratorio" style={{ color: '#F1F6F9' }}>Laboratorio remoto</a>
              </li>
                </>
              )}

              {/**ADMINISTRADOR*/}

              {getRol() === "ADMINISTRADOR" && (
                <>
                 <li className="nav-item">
                <a className="nav-link" href="/admin/usuarios" style={{ color: '#F1F6F9' }}>Registrar usuario</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin/matricular" style={{ color: '#F1F6F9' }}>Matricular</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin/docentes" style={{ color: '#F1F6F9' }}>Asignar docente</a>
              </li>
                </>
              )}
                {/**DOECNTE

              {getRol() === "DOCENTE" && (
                <>
                 <li className="nav-item">
                <a className="nav-link" href="/docente/entregas" style={{ color: '#F1F6F9' }}>Entregas</a>
              </li>
                </>
              )}*/}

              
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={handleCerrarSesion} style={{ color: '#F1F6F9' }}>Cerrar sesion</a>
              </li>
              { /*<li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: '#F1F6F9' }}>
                  Dropdown
                </a>
                <ul className="dropdown-menu" aria-labelledby="offcanvasNavbarDropdown" style={{ background: "#212A3E" }}>
                  <li><a className="dropdown-item" style={{ color: '#F1F6F9' }} href="#">Acción</a></li>
                  <li><a className="dropdown-item"  style={{ color: '#F1F6F9' }} href="#">Otra acción</a></li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li><a className="dropdown-item" style={{ color: '#F1F6F9' }} href="#">Algo más aquí</a></li>
                </ul>
  </li>*/}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default BarraNavegacion;