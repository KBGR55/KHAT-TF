import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from 'react-bootstrap';
import mensajes from '../utilidades/Mensajes';
import { borrarSesion, getToken } from '../utilidades/Sessionutil';
import React, { useState } from 'react';
import { useNavigate } from "react-router";
import Footer from "./Footer";
import EditarPersona from "./EditarPersona";
import AsignarActividad from "./AsignarActividad";
import CambiarEstado from "./CambiarEstado";
import { ListadoPracticas, ObtenerAsignatura, Personas } from "../hooks/Conexion";
import { Link, unstable_HistoryRouter } from "react-router-dom";
import GenerarMatricula from "./GenerarMatricula";

export const ListarPracticas = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [data, setData] = useState([]);
    const navegation = useNavigate();
    const [llPracticas, setllPracticas] = useState(false);
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
    const [asignatura, setAsignatura] = useState([]);

    if (!llPracticas) {
        ListadoPracticas(getToken()).then((info) => {
            if (info.code !== 200 && info.msg == 'Acceso denegado. Token a expirado') {
                borrarSesion();
                mensajes(info.mensajes);
                navegation("/sesion")
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
        setpersonaObtenida((prevState) => ({
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
                        <h2 style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Listado de Practicas</h2>
                    </div>
                    <div className="col-sm-6 mt-5 mb-4 text-gred d-flex justify-content-end">
                        <Button variant="primary" style={{ backgroundColor: "#212A3E" }} onClick={handleShow}>
                           
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
                            <Modal.Title>Editar registro</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <EditarPersona personaObtenida={personaObtenida} handleChange={handleChange} />
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => { handleCloseEdit(); setllPracticas(false); }}>
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
                            <Button variant="secondary" onClick={() => { handleCloseChance(); setllPracticas(false); }}>
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

export default ListarPracticas;