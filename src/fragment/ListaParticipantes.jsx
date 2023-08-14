import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Actualizar,Obtener, URLBASE } from '../hooks/Conexion';
import mensajes from '../utilidades/Mensajes';
import { borrarSesion, getToken, getUser } from '../utilidades/Sessionutil';
import BarraNavegacion from './BarraNavegacion';
import { Button,  Modal } from 'react-bootstrap';
import AsignarActividad from './AsignarActividad';
import '../css/styleNombre.css';

const ListaParticipantes = () => {
    const { id } = useParams(); // Obtener el valor del parámetro "id" de la URL
    const [show, setShow] = useState(false);//Modal actividad
    const handleClose = () => setShow(false);//Modal actividad
    const handleShow = () => setShow(true);//Modal actividad
    const navegation = useNavigate();
    const [asignatura, setAsignatura] = useState([]);//para listar asignaturas
    const [llasignaturas, setLlasignaturas] = useState(false);//para listar asignaturas
    const [participantes, setParticipantes] = useState([]);//para listar asignaturas

    // Esta función maneja la lógica de obtención y configuración de la asignatura
    async function obtenerAsignatura(id) {
        try {
            const info = await Obtener(getToken(), `obtener/asignatura/${id}`);

            if (info.error === true || info.msg === 'Token no valido o expirado!') {
                borrarSesion();
                mensajes(info.msg);
            } else {
                console.log(info.info);
                setAsignatura(info.info);
                buscarParticipantes(info.info.id);
            }
            if (info.code !== 200) {
                mensajes(info.msg);
            }
        } catch (error) {
            console.error("Error en la obtención de asignatura:", error);
        }
    }
    async function buscarParticipantes(paramsAsigna) {
        var aux = {
            "docente_cedula": getUser().identificacion,
            "id_asignatura": paramsAsigna
        }
        console.log(aux);
        Actualizar(aux, getToken(), "listar/estudiantes/asignatura/cursa").then((info) => {
            console.log("karen presiosa");
            console.log(info.info);
            if (info.code !== 200 || info.msg === "TOKEN NO VALIDO O EXPIRADO") {
                borrarSesion();
                mensajes(info.msg, "error", "error");
                navegation("/");
            } else {
                setParticipantes(info.info);
            }
        });
    }
    // En tu componente, puedes llamar a esta función dentro de un useEffect o un evento
    if (!llasignaturas) {
        obtenerAsignatura(id);
        setLlasignaturas(true);
    }
    useEffect(() => {
        setLlasignaturas(false);
    }, []);
    return (
        <div id="root" className="vh-100 d-flex flex-column">
            <BarraNavegacion></BarraNavegacion>
            <div className="container datos-container mx-auto p-4 my-4" style={{ maxWidth: '1200px' }}>
                <div className="contenedor-listados">
                    <div className="col-md-12" style={{ marginBottom: '50px' }}></div> {/* Espacio adicional */}
                    <div className="row">
                        <div className="sidebar " >
                            <h1 className="display-4">{asignatura.nombre}</h1>
                        </div>
                        <div className="col-md-12" style={{ marginBottom: '50px' }}></div> {/* Espacio adicional */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                            <Button variant="primary" onClick={handleShow} style={{ backgroundColor: "#212A3E" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-plus" viewBox="0 0 16 16">
                                    <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z" />
                                    <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
                                </svg>
                                {" "}
                                Asignar actividad
                            </Button>
                        </div>

                        <div className="col-md-12">
                            <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded mx-auto">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <form className="form-sample" encType="multipart/form-data">
                                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                                        <h5 className="mb-0" style={{ fontWeight: 'bold', fontSize: '24px' }}>Listado de participantes</h5>
                                                    </div>
                                                    {/* ... (contenido del primer listado) */}
                                                    <div className="col">
                                                        <table className="table table-striped">
                                                            <thead className="table-dark">
                                                                <tr>
                                                                    <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#212A3E", border: "none" }}>Avatar</th>
                                                                    <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Nombres</th>
                                                                    <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Apellidos</th>
                                                                    <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Identificación</th>
                                                                    <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Tipo de identificación</th>
                                                                    <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Estado</th>
                                                                    <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Entregas</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {participantes.map((persona) => (
                                                                    <tr key={persona.id}>
                                                                        <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>
                                                                            <img src={URLBASE + "/images/users/" + persona.matricula.persona.foto} alt="Avatar" style={{ width: '50px', height: '50px' }} />
                                                                        </td>
                                                                        <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{persona.matricula.persona.nombres}</td>
                                                                        <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{persona.matricula.persona.apellidos}</td>
                                                                        <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{persona.matricula.persona.identificacion}</td>
                                                                        <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{persona.matricula.persona.tipo_identificacion}</td>
                                                                        <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>
                                                                            {persona.matricula.estado ? "ACTIVO" : "DADO DE BAJA"}
                                                                        </td>
                                                                        <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>
                                                                            <a href={`/docente/participantes/entrega/${persona.external_id}`} rel="noopener noreferrer">
                                                                                <Button
                                                                                    variant="btn btn-outline btn-rounded"
                                                                                    // onClick={handleShow}
                                                                                    style={{
                                                                                        backgroundColor: '#9BA4B5',
                                                                                        borderColor: '#9BA4B5',
                                                                                        color: '#FFFFFF'
                                                                                    }}>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-folder-check" viewBox="0 0 16 16">
                                                                                        <path d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672z" />
                                                                                        <path d="M15.854 10.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.707 0l-1.5-1.5a.5.5 0 0 1 .707-.708l1.146 1.147 2.646-2.647a.5.5 0 0 1 .708 0z" />
                                                                                    </svg>
                                                                                </Button>
                                                                            </a>

                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!--- Model Box ---> */}
                <div className="model_box">
                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        style={{ '--bs-modal-width': '75%' }}
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Agregar actividad</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <AsignarActividad parametroLista={participantes} ></AsignarActividad>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cerrar
                            </Button>

                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );

}

export default ListaParticipantes;