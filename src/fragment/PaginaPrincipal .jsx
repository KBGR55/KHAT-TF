import React, { useState, useEffect } from 'react';
import BarraNavegacion from './BarraNavegacion';
import { Obtener } from '../hooks/Conexion';
import { borrarSesion, getRol, getToken, getUser } from '../utilidades/Sessionutil';
import mensajes from '../utilidades/Mensajes';
import FondoAdministrador from '../images/chocolate.jpeg';
import FondoEstudiante from '../images/mishu.jpeg';
import FondoDocente  from '../images/noches.jpeg';
const PaginaPrincipal = () => {
    const [asignaturas, setasignaturas] = useState([]);//para listar asignaturas
    const [llasignaturas, setLlasignaturas] = useState(false);//para listar asignaturas


    if (!llasignaturas) {
        let url = '';
        if (getRol() === 'ESTUDIANTE') {
            url = `listar/asignaturas/estudiantes/cursa/${getUser().id}`;
        } else if (getRol() === 'DOCENTE') {
            url = `listar/asignaturas/docentes/cursa/${getUser().identificacion}`;
        }
        if (url!=='') {
            Obtener(getToken(), url).then((info) => {
                if (info.error === true || info.msg === 'Token no valido o expirado!') {
                    borrarSesion();
                    mensajes(info.msg);
                } else {
                    if (Array.isArray(info.info)) {
                        setasignaturas(info.info);
                        setLlasignaturas(true);
                    } else if (typeof info.info === 'object') {
                        setasignaturas([info.info]);
                        setLlasignaturas(true);
                    } else {
                        console.error("No es un array válido");
                    }
                }
            });
        }
    }

    const obtenerFondo = () => {
        if (getRol() === 'ESTUDIANTE') {
            return FondoEstudiante;
        } else if (getRol() === 'DOCENTE') {
            return FondoDocente;
        } else if (getRol() === 'ADMINISTRADOR') {
            return FondoAdministrador;
        }
        return null;
    };

    const fondoStyle = {
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundImage: `url(${obtenerFondo()})`,
    };
    useEffect(() => {
        setLlasignaturas(false);
    }, []);

    return (
        <div id="root" className=" d-flex justify-content-center align-items-center vh-100" style={fondoStyle}>
            <BarraNavegacion></BarraNavegacion>
            <div className="d-flex flex-column">
                <div className="container" >
                {(getRol() === "ESTUDIANTE" || getRol() === 'DOCENTE') && (
                                <>
                    <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                        <div className="row ">
                            {/* ESTUDIANTE */}
                            {getRol() === "ESTUDIANTE" && (
                                <>
                                    <div className='content-fluid'>
                                        <h1 className="h3 mb-0 text-gray-800">ASIGNATURAS EN CURSO</h1>
                                        <div className="row" style={{ marginTop: "20px" }}>
                                            {asignaturas.map((asignatura, index) => (
                                                <div className="col-xl-3 col-md-6 mb-4" key={index}>
                                                    <div className="card border-left-primary shadow h-100 py-2">
                                                        <div className="card-body">
                                                            <div className="row no-gutters align-items-center">
                                                                <div className="col mr-2">
                                                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                                        {asignatura.nombre}
                                                                    </div>
                                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                                        {asignatura.asignatura.nombre}
                                                                    </div>
                                                                </div>
                                                                <div className="col-auto" >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#212A3E" class="bi bi-journal-bookmark-fill" viewBox="0 0 16 16">
                                                                        <path fill-rule="evenodd" d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8V1z" />
                                                                        <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                                                                        <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
                                                                    </svg>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="card-body no-gutters align-items-center" style={{ textAlign: 'center', width: "100%" }}>
                                                            <a className="btn btn-primary btn-block"  href={`/estudiantes/practica/${asignatura.external_id}`}  style={{ background: "#212A3E", border: '2px solid #212A3E' }}>
                                                                Acceder
                                                            </a>
                                                        </div>
                                                    </div>

                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                </>
                            )}
                            {/**DOCENTE */}
                            {getRol() === "DOCENTE" && (
                                <>
                                    <div className='content-fluid'>
                                        <h1 className="h3 mb-0 text-gray-800">ASIGNATURAS IMPARTIDAS</h1>
                                        <div className="row" style={{ marginTop: "20px" }}>
                                            {asignaturas.map((asignatura, index) => (
                                                <div className="col-xl-3 col-md-6 mb-4" key={index}>
                                                    <div className="card border-left-primary shadow h-100 py-2">
                                                        <div className="card-body">
                                                            <div className="row no-gutters align-items-center">
                                                                <div className="col mr-2">
                                                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                                        {asignatura.nombre}
                                                                    </div>
                                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                                        {asignatura.asignatura.nombre}
                                                                    </div>
                                                                </div>
                                                                <div className="col-auto" >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#212A3E" class="bi bi-journal-bookmark-fill" viewBox="0 0 16 16">
                                                                        <path fill-rule="evenodd" d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8V1z" />
                                                                        <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                                                                        <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
                                                                    </svg>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="card-body no-gutters align-items-center" style={{ textAlign: 'center', width: "100%" }}>
                                                            <a className="btn btn-primary btn-block" href={`/docente/participantes/${asignatura.asignatura.external_id}`} style={{ background: "#212A3E", border: '2px solid #212A3E' }}>
                                                                Acceder
                                                            </a>
                                                        </div>
                                                    </div>

                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    </>
                            )}
                </div>


            </div>
        </div>
    );
};

export default PaginaPrincipal;