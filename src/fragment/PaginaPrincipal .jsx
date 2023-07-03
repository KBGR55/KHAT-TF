import React from 'react';
import Footer from './Footer';
import { Asignatura } from '../hooks/Conexion';
import { borrarSesion, getToken } from '../utilidades/Sessionutil';
import mensajes from '../utilidades/Mensajes';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaginaPrincipal = () => {
  const navegation = useNavigate();
  const [asignaturas, setAsignaturas] = useState([]);

  useEffect(() => {
    Asignatura(getToken()).then((info) => {
      if (info.error === true && info.mensaje === 'Acceso denegado. Token ha expirado') {
        borrarSesion();
        mensajes(info.mensajes);
        navegation('/sesion');
      } else {
        setAsignaturas(info.info);
      }
    });
  }, []);

  return (
    <div className="wrapper">
      <div className="d-flex flex-column">
        <div className="content">
          {/* Header */}
          <header>
            {/* ... Código omitido ... */}
          </header>

          <div className="container">
            <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
              <div className="row">
                {/* Section */}
                <div className="content-fluid">
                  <h1 className="h3 mb-0 text-gray-800">Vista general de cursos</h1>
                  <div className="row">
                    {asignaturas.map((asignatura) => (
                      <div className="col-xl-3 col-md-6 mb-4" key={asignatura.external_id}>
                        <div className="card border-left-primary shadow h-100 py-2">
                          <div className="card-body">
                            <div className="row no-gutters align-items-center">
                              <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">{asignatura.nombre}</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">
                                  Ciclo: {asignatura.ciclo.numero_ciclo}
                                </div>
                              </div>
                              <div className="col-auto">
                                <i className="fas fa-calendar fa-2x text-gray-300"></i>
                              </div>
                            </div>
                            <div className="row no-gutters align-items-center">
                              <div className="col">
                                <a className="btn btn-primary btn-block" href={`/paginaPrincipal/asignatura/${asignatura.external_id}`}>
                                  Acceder
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Footer */}
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaginaPrincipal;
