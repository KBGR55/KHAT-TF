import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from 'react-bootstrap';
import mensajes from '../utilidades/Mensajes';
import { borrarSesion, getToken } from '../utilidades/Sessionutil';
import React, { useState } from 'react';
import { useNavigate } from "react-router";
import Footer from "./Footer";
import AsignarActividad from "./AsignarActividad";
import { ListadoPracticas, ObtenerAsignatura, ObtenerPractica, ChanceEstadoPractica } from "../hooks/Conexion";
import { Link } from "react-router-dom";
import EditarPractica from "./EditarPractica";

export const ListarPracticas = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [data, setData] = useState([]);
    const navegation = useNavigate();
    const [llPracticas, setllPracticas] = useState(false);
    const [practicaObtenida, setpracticaObtenida] = useState([]);
    const [searchValue, setSearchValue] = useState(''); // PARA LA BUSQUEDA POR ID
    const handleSearchChange = (event) => { setSearchValue(event.target.value); }; // PARA LA BUSQUEDA POR ID
    const [asignatura, setAsignatura] = useState([]);

    //SHOW EDITAR
    const [showEdit, setShowEdit] = useState(false);
    const handleShowEdit = () => setShowEdit(true);
    const handleCloseEdit = () => setShowEdit(false);

    //SHOW CAMBIAR ESTADO
    const [showChance, setShowChance] = useState(false);
    const handleCloseChance = () => setShowChance(false);

    if (!llPracticas) {
        ListadoPracticas(getToken()).then((info) => {
            if (info.code !== 200 && info.msg == 'Acceso denegado. Token a expirado') {
                borrarSesion();
                mensajes(info.mensajes);
                navegation("/practicas")
            } else {
                setData(info.info);
                setllPracticas(true);
            }
        })
        for (let index = 0; index < data.length; index++) {
            Asignaturas(data[index].external_id_cursa);
        }
    }

    //ACCION HABILITAR EDICION CAMPOS
    const handleChange = e => {
        const { name, value } = e.target;
        setpracticaObtenida((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const Asignaturas = (id) => {
        ObtenerAsignatura(id, getToken()).then((info) => {
            var datos = info.info;
            if (info.code !== 200) {
                mensajes(info.mensajes);
            } else {
                setAsignatura(datos);
            }
        })
    };

    const obtenerId = (id) => {
        console.log(id);
        ObtenerPractica(id, getToken()).then((info) => {
            var datos = info.info;
            if (info.code !== 200) {
                mensajes(info.mensajes);
            } else {
                setpracticaObtenida(datos);
            }
        })
    };

    const obtenerFechaFormateada = (fechaString) => {
        const fecha = new Date(fechaString);
        fecha.setDate(fecha.getDate() + 1); 
        const year = fecha.getFullYear();
        const month = ('0' + (fecha.getMonth() + 1)).slice(-2);
        const day = ('0' + fecha.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };

    const handleShowChance = (id) => {
        var datos = {
            "external_id": id
          };
        ChanceEstadoPractica(datos, getToken()).then((info) => {
            if (info.code !== 200) {
                mensajes(info.msg, 'error', 'Error');
            } else {
                mensajes(info.msg);
                navegation('/practicas');
            }
        });
    };

    return (
        <div className="container">

            <div className="col-sm-6 mt-5 mb-4 text-gred d-flex justify-content-end">

            </div>
            <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                <div className="row ">
                    <div className="col-sm-6 mt-5 mb-4 text-gred" style={{ color: "#212A3E" }}>
                        <h2 style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Listado de Practicas</h2>
                    </div>
                    <div className="col-sm-6 mt-5 mb-4 text-gred d-flex justify-content-end">
                        <Button variant="primary" style={{ backgroundColor: "#212A3E" }} onClick={handleShow}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                            <span style={{ marginLeft: '5px' }}>Asignar</span>
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
                                <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Fecha Habilitada</th>
                                <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Fecha Entrega</th>
                                <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Asignatura</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((practica) => (
                                <tr key={practica.id}>
                                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{practica.practica_nombre}</td>
                                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{obtenerFechaFormateada(practica.fecha_habilitada)}</td>
                                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{obtenerFechaFormateada(practica.fecha_entrega)}</td>
                                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{practica.nombre}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <Button variant="btn btn-outline-info btn-rounded" onClick={() => {
                                                handleShowEdit();
                                                obtenerId(practica.external_id);
                                            }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                </svg>
                                            </Button>

                                            <Button variant="btn btn-outline-secondary btn-rounded" onClick={() => {
                                                handleShowChance(practica.external_id);
                                            }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
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
                            <AsignarActividad></AsignarActividad>
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
                            <Modal.Title>Editar practica</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <EditarPractica practicaObtenida={practicaObtenida} handleChange={handleChange} />
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => { handleCloseEdit(); setllPracticas(false); }}>
                                Cerrar
                            </Button>


                        </Modal.Footer>
                    </Modal>
                </div>

            </div>
        </div>
    );
}

export default ListarPracticas;