import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from 'react-bootstrap';
import mensajes from '../utilidades/Mensajes';
import { borrarSesion, getToken } from '../utilidades/Sessionutil';
import React, { useState } from 'react';
import { useNavigate } from "react-router";
import Footer from "./Footer";
import EditarPersona from "./EditarPersona";
import CambiarEstado from "./CambiarEstado";
import RegistrarEstudiantes from "./RegistrarEstudiantes";
import { ListadoRegistros, ObtenerPersona, Personas } from "../hooks/Conexion";
import { Link, unstable_HistoryRouter } from "react-router-dom";
import GenerarMatricula from "./GenerarMatricula";

export const ListarPersonas = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [data, setData] = useState([]);
    const navegation = useNavigate();
    const [llPersonas, setLlṔersonas] = useState(false);
    const [personaObtenida, setpersonaObtenida] = useState([]);
    const [searchValue, setSearchValue] = useState(''); // PARA LA BUSQUEDA POR ID
    const handleSearchChange = (event) => { setSearchValue(event.target.value); }; // PARA LA BUSQUEDA POR ID

    //SHOW EDITAR
    const [showEdit, setShowEdit] = useState(false);
    const handleShowEdit = () => setShowEdit(true);
    const handleCloseEdit = () => setShowEdit(false);

    //SHOW CAMBIAR ESTADO
    const [showChance, setShowChance] = useState(false);
    const handleShowChance = () => setShowChance(true);
    const handleCloseChance = () => setShowChance(false);

    //SHOW MATRICULAS
    const [showMatricula, setshowMatricula] = useState(false);
    const handleShowMatricula = () => setshowMatricula(true);
    const handleCloseMatricula = () => setshowMatricula(false);

    if (!llPersonas) {
        ListadoRegistros(getToken()).then((info) => {
            if (info.code !== 200 && info.msg == 'Acceso denegado. Token a expirado') {
                borrarSesion();
                mensajes(info.mensajes);
                navegation("/sesion")
            } else {
                setData(info.info);
                setLlṔersonas(true);
            }
        })
    }

    //ACCION HABILITAR EDICION CAMPOS
    const handleChange = e => {
        const { name, value } = e.target;
        setpersonaObtenida((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    //ACCION OBTENER DATOS DE UN AUTO
    const obtenerId = (id) => {
        ObtenerPersona(id, getToken()).then((info) => {
            var datos = info.info;
            if (info.code !== 200) {
                mensajes(info.mensajes);
            } else {
                setpersonaObtenida(datos);
            }
        })
    };

    //CAMBIAR FORMATO FECHA

    const obtenerFechaFormateada = (fechaString) => {
        const fecha = new Date(fechaString);
        fecha.setDate(fecha.getDate() + 1); // Ajustar la fecha sumando 1 día
        const year = fecha.getFullYear();
        const month = ('0' + (fecha.getMonth() + 1)).slice(-2);
        const day = ('0' + fecha.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };

    return (
        <div className="container">

            <div className="col-sm-6 mt-5 mb-4 text-gred d-flex justify-content-end">

            </div>
            <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                <div className="row ">
                    <div className="col-sm-6 mt-5 mb-4 text-gred" style={{ color: "#212A3E" }}>
                        <h2 style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Listado de Registros en la plataforma</h2>
                    </div>
                    <div className="col-sm-6 mt-5 mb-4 text-gred d-flex justify-content-end">
                        <Button variant="primary" style={{ backgroundColor: "#212A3E" }} onClick={handleShow}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill-add" viewBox="0 0 16 16">
                                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                            </svg>
                            <span style={{ marginLeft: '5px' }}>Agregar</span>
                        </Button>
                        <Link to="/paginaPrincipal" className="btn btn-secondary">
                            Volver a la página principal
                        </Link>
                    </div>


                </div>
                <div className="col">
                    <table className="table table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Nombres</th>
                                <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Apellidos</th>
                                <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Identificación</th>
                                <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Tipo de identificación</th>
                                <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Rol</th>
                                <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Fecha Nacimiento</th>
                                <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Número de teléfono</th>
                                <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Direccion</th>
                                <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Estado</th>
                                <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Acciones</th>
                                <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Generar Matricula</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((estudiante) => (
                                <tr key={estudiante.id}>
                                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{estudiante.persona.nombres}</td>
                                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{estudiante.persona.apellidos}</td>
                                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{estudiante.persona.identificacion}</td>
                                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{estudiante.persona.tipo_identificacion}</td>
                                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{estudiante.rol.tipo}</td>
                                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{obtenerFechaFormateada(estudiante.persona.fecha_nacimiento)}</td>
                                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{estudiante.persona.telefono}</td>
                                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{estudiante.persona.direccion}</td>
                                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>
                                        {estudiante.persona.estado ? "ACTIVO" : "DADO DE BAJA"}
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <Button variant="btn btn-outline-info btn-rounded" onClick={() => {
                                                handleShowEdit();
                                                obtenerId(estudiante.persona.external_id);
                                            }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                </svg>
                                            </Button>

                                            <Button variant="btn btn-outline-secondary btn-rounded" onClick={() => {
                                                handleShowChance();
                                                obtenerId(estudiante.persona.external_id);
                                            }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-square" viewBox="0 0 16 16">
                                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
                                                </svg>
                                            </Button>

                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                                            <Button variant="btn btn-outline-success btn-rounded" onClick={() => {
                                                handleShowMatricula();
                                                obtenerId(estudiante.persona.external_id);
                                            }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-check" viewBox="0 0 16 16">
                                                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                                                    <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
                                                </svg>
                                            </Button>
                                        </div>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Footer />
                {/* VENTANA MODAL AGREGAR */}
                <div className="model_box">
                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        style={{ '--bs-modal-width': '75%' }}
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Agregar registro</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <RegistrarEstudiantes />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cerrar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>

                {/* < VENTANA MODAL EDITAR> */}
                <div className="model_box">
                    <Modal
                        show={showEdit}
                        onHide={handleCloseEdit}
                        //backdrop="static"
                        keyboard={true}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Editar registro</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <EditarPersona personaObtenida={personaObtenida} handleChange={handleChange} />
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => { handleCloseEdit(); setLlṔersonas(false); }}>
                                Cerrar
                            </Button>


                        </Modal.Footer>
                    </Modal>
                </div>

                {/* < VENTANA MODAL CAMBIAR ESTADO */}
                <div className="model_box">
                    <Modal
                        show={showChance}
                        onHide={handleCloseChance}
                        //backdrop="static"
                        keyboard={true}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Cambiar estado</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <CambiarEstado personaObtenida={personaObtenida} handleChange={handleChange} />
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => { handleCloseChance(); setLlṔersonas(false); }}>
                                Cerrar
                            </Button>


                        </Modal.Footer>
                    </Modal>
                </div>

                {/* < VENTANA MODAL GENERAR MATRICULA */}
                <div className="model_box">
                    <Modal
                        show={showMatricula}
                        onHide={handleCloseMatricula}
                        //backdrop="static"
                        keyboard={true}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Generar Matricula</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <GenerarMatricula personaObtenida={personaObtenida} handleChange={handleChange} />
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => { handleCloseMatricula()}}>
                                Cerrar
                            </Button>


                        </Modal.Footer>
                    </Modal>
                </div>

            </div>
        </div>
    );
}

export default ListarPersonas;
