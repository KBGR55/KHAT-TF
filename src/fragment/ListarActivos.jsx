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
import { Activos, ListadoRegistros, ObtenerPersona, Personas } from "../hooks/Conexion";
import { Link, unstable_HistoryRouter } from "react-router-dom";
import GenerarMatricula from "./GenerarMatricula";

export const ListarActivos = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [data, setData] = useState([]);
    const navegation = useNavigate();
    const [llPersonas, setLlṔersonas] = useState(false);
    const [personaObtenida, setpersonaObtenida] = useState([]);
    const [searchValue, setSearchValue] = useState(''); // PARA LA BUSQUEDA POR ID
    const handleSearchChange = (event) => { setSearchValue(event.target.value); }; // PARA LA BUSQUEDA POR ID


    //SHOW MATRICULAS
    const [showMatricula, setshowMatricula] = useState(false);
    const handleShowMatricula = () => setshowMatricula(true);
    const handleCloseMatricula = () => setshowMatricula(false);

    if (!llPersonas) {
        Activos(getToken()).then((info) => {
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
            <div className="row">
                <div className="col-sm-6 mt-5 mb-4 text-gred">
                    <h2 style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Listado de Registros en la plataforma</h2>
                </div>
                <div className="col-sm-6 mt-5 mb-4 text-gred d-flex justify-content-end">

                </div>
            </div>


            <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded" style={{ display: 'flex', flexDirection: 'column' }}>

                <div className="col">
                    <table className="table table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Nombres</th>
                                <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Apellidos</th>
                                <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Identificación</th>
                                <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Tipo de identificación</th>
                                <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Fecha Nacimiento</th>
                                <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Número de teléfono</th>
                                <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Direccion</th>
                                <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Generar Matricula</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((estudiante) => (
                                <tr key={estudiante.id}>
                                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{estudiante.nombres}</td>
                                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{estudiante.apellidos}</td>
                                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{estudiante.identificacion}</td>
                                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{estudiante.tipo_identificacion}</td>
                                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{obtenerFechaFormateada(estudiante.fecha_nacimiento)}</td>
                                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{estudiante.telefono}</td>
                                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{estudiante.direccion}</td>
                                    <td>
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                                            <Button variant="btn btn-outline-success btn-rounded" onClick={() => {
                                                handleShowMatricula();
                                                obtenerId(estudiante.external_id);
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
                            <Button variant="secondary" onClick={() => { handleCloseMatricula() }}>
                                Cerrar
                            </Button>


                        </Modal.Footer>
                    </Modal>
                </div>

            </div>
        </div >
    );
}

export default ListarActivos;
