import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, FormControl, InputGroup } from 'react-bootstrap';
import React, { useState } from 'react';
import { useNavigate } from "react-router";
import mensajes from '../utilidades/Mensajes';
import { getToken, borrarSesion } from '../utilidades/Sessionutil';
import { Listar, obtener, URLBASE } from "../hooks/Conexion";
import EditarPersona from "./EditarPersona";
import RegistrarPersona from "./RegistrarPersona";
import BarraNavegacion from "./BarraNavegacion";

export const ListarPersonas = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [data, setData] = useState([]);
    const [tablaListarPersonas, setTablaListarPersonas] = useState([]);
    const navegation = useNavigate();
    const [llPersonas, setLlṔersonas] = useState(false);
    const [personaObtenida, setpersonaObtenida] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const handleShowEdit = () => setShowEdit(true);
    const handleCloseEdit = () => setShowEdit(false);

    if (!llPersonas) {
        console.log(getToken());
        Listar(getToken(), "personas/listar").then((info) => {

            if (info.code !== 200 || info.msg === "TOKEN NO VALIDO O EXPIRADO") {
                borrarSesion();
                mensajes(info.msg, "error", "error");
                navegation("/");
            } else {
                setData(info.info);
                setTablaListarPersonas(info.info)
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

    const handleSearch = e => {
        filtrar(e.target.value);
    }

    const filtrar = (terminoBusqueda) => {
        const estadoActivo = "ACTIVO";
        const estadoDadoDeBaja = "DADO DE BAJA";

        var resultadosBusqueda = tablaListarPersonas.filter((elemento) => {
            const cedulaIncluida = elemento.identificacion && elemento.identificacion.toString().toLowerCase().includes(terminoBusqueda.toLowerCase());
            const rolIncluido = elemento.persona_rol && elemento.persona_rol.some((rol) => rol.rol.tipo.toLowerCase().includes(terminoBusqueda.toLowerCase()));
            const estadoIncluido =
                (terminoBusqueda.toLowerCase() === estadoActivo.toLowerCase() && elemento.estado) ||
                (terminoBusqueda.toLowerCase() === estadoDadoDeBaja.toLowerCase() && !elemento.estado);
            return cedulaIncluida || rolIncluido || estadoIncluido;
        });
        setData(resultadosBusqueda);
    };

    const obtenerId = (id) => {
        obtener(id, getToken(), "personas").then((info) => {
            var datos = info.info;
            if (info.code !== 200 || info.msg === "TOKEN NO VALIDO O EXPIRADO") {
                mensajes(info.msg, "error", "error");
            } else {
                setpersonaObtenida(datos);
            }
        })
    };

    const obtenerFechaFormateada = (fechaString) => {
        const fecha = new Date(fechaString);
        fecha.setDate(fecha.getDate() + 1); // Ajustar la fecha sumando 1 día
        const year = fecha.getFullYear();
        const month = ('0' + (fecha.getMonth() + 1)).slice(-2);
        const day = ('0' + fecha.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };

    return (
        <div id="root" className="d-flex justify-content-center align-items-center vh-100">
            <BarraNavegacion></BarraNavegacion>
            <div className="container-fluid" >
                <div className="row row-cols-1">
                    <div className="col-sm-6 mt-5 mb-4 text-gred">
                        <h2 style={{ fontWeight: 'bold', whiteSpace: 'nowrap', color: "#212A3E" }}>Listar personas de la plataforma</h2>
                    </div>
                </div>

                <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded" style={{ display: 'flex', flexDirection: 'column', maxHeight: '80vh', overflowY: 'auto' }}>
                    <div style={{ display: 'flex', marginBottom: '10px' }}>
                        <InputGroup>
                            <InputGroup.Text className="bg-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M9.5 3a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM1 9.5a8.5 8.5 0 1 1 17 0 8.5 8.5 0 0 1-17 0z"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        d="M16.853 16.854a.5.5 0 0 0 .707 0l3.793-3.793a.5.5 0 0 0 0-.707l-3.793-3.793a.5.5 0 0 0-.707.707L19.293 12H10.5a.5.5 0 0 0 0 1h8.793l-2.646 2.646a.5.5 0 0 0 0 .707z"
                                    />
                                </svg>
                            </InputGroup.Text>
                            <FormControl
                                type="search"
                                className="me-2"
                                placeholder="Buscar por un criterio (Cédula, Rol, Estado)"
                                onChange={handleSearch}
                            />
                        </InputGroup>
                        <Button variant="primary" style={{ backgroundColor: "#212A3E" }} onClick={handleShow}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill-add" viewBox="0 0 16 16">
                                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                            </svg>
                            {" "}
                            Registrar Usuario

                        </Button>
                    </div>

                    <div className="col">
                        <table className="table table-striped">
                            <thead className="table-dark">
                                <tr>
                                    <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#212A3E", border: "none" }}>Avatar</th>
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
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((persona) => (
                                    <tr key={persona.id}>
                                        <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>
                                            {/* Verificar si hay una URL válida antes de mostrar la imagen */}
                                            <img src={URLBASE + "/images/users/" + persona.foto} alt="Avatar" style={{ width: '50px', height: '50px' }} />
                                        </td>
                                        <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{persona.nombres}</td>
                                        <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{persona.apellidos}</td>
                                        <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{persona.identificacion}</td>
                                        <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{persona.tipo_identificacion}</td>
                                        <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>
                                            {persona.persona_rol.length > 0 ? persona.persona_rol[0].rol.tipo : "NO ASIGNADO"}
                                        </td>
                                        <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{obtenerFechaFormateada(persona.fecha_nacimiento)}</td>
                                        <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{persona.telefono}</td>
                                        <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{persona.direccion}</td>
                                        <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>
                                            {persona.estado ? "ACTIVO" : "DADO DE BAJA"}
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <Button variant="btn btn-outline-info btn-rounded" onClick={() => {
                                                    handleShowEdit();
                                                    obtenerId(persona.external_id);
                                                }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                    </svg>
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
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
                                <Modal.Title>Registrar Usuario</Modal.Title>
                            </Modal.Header>
                            <RegistrarPersona></RegistrarPersona>
                        </Modal>
                    </div>

                    {/* < VENTANA MODAL EDITAR> */}
                    <div className="model_box">
                        <Modal
                            show={showEdit}
                            onHide={handleCloseEdit}
                            backdrop="static"
                            style={{ '--bs-modal-width': '75%' }}
                            keyboard={true}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Editar Usuario</Modal.Title>
                            </Modal.Header>
                            <EditarPersona personaObtenida={personaObtenida} handleChange={handleChange} />
                        </Modal>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default ListarPersonas;