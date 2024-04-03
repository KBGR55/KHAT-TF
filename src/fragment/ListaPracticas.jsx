import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Guardar, Listar, Obtener, URLBASE } from '../hooks/Conexion';
import mensajes from '../utilidades/Mensajes';
import { borrarSesion,getToken} from '../utilidades/Sessionutil';
import { Button, Modal} from 'react-bootstrap';
import BarraNavegacion from './BarraNavegacion';
import SubirActividad from './SubirActividad';
import '../css/styleNombre.css';
import ListaCalificacion from './ListaCalificacion';


const ListaPracticas = () => {
    const { id } = useParams(); 
    const { handleSubmit } = useForm();
    const navegation = useNavigate();
    const [llasignaturas, setLlasignaturas] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [cursa, setCursa] = useState();
    const [docente, setDocente] = useState();
    const [practica, setPractica] = useState([]);
    const [pracObt, setPracObt] = useState([]);
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [pracObt2, setPracObt2] = useState([]);//

    const onSubmit = (data) => {
        var datos = {
            "cedula_docente": data.cedula_docente,
            "external_asignatura": data.external_asignatura,
            "cupos": data.cupos
        };
        Guardar(datos, getToken(), 'asignar/docente').then((info) => {
            console.log(datos);
            if (info.error === true) {
                mensajes(info.msg, 'error', 'Error');
            } else {
                data.cupos = 0;
                mensajes(info.msg);
            }
        }
        );
    };
    if (!llasignaturas) {
        obtenerInformacion(id);
        Listar(getToken(), `listar/practica/cursa/${id}`).then((info) => {

            if (info.code !== 200 || info.msg === "TOKEN NO VALIDO O EXPIRADO") {
                borrarSesion();
                mensajes(info.msg, "error", "error");
                navegation("/");
            } else {
                setPractica(info.info);
            }
        });
        setLlasignaturas(true);
    }
    async function obtenerInformacion(id) {
        try {
            const info1 = await Obtener(getToken(), `obtener/cursa/${id}`);
            if (info1.error === true || info1.msg === 'Token no valido o expirado!') {
                borrarSesion();
                mensajes(info1.msg);
            } else {
                setCursa(info1.info.asignatura.nombre);
            }
            const info2 = await Obtener(getToken(), `obtener/docente/cursa/${id}`);

            if (info2.error === true || info2.msg === 'Token no valido o expirado!') {
                borrarSesion();
                mensajes(info2.msg);
            } else {
                setDocente(info2.info[0].apellidos + " " + info2.info[0].nombres);

            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
   
    const obtenerDatosIngreso = (id) => {
        setPracObt(id);
    };
    const obtenerDatosIngreso2 = (id) => {
        setPracObt2(id);
    };
    useEffect(() => {
        setLlasignaturas(false);
    }, []);

    return (
        <div id="root" className="d-flex justify-content-center align-items-center vh-100">
            <BarraNavegacion></BarraNavegacion>
            <div className="col-md-12" style={{ maxWidth: '1200px' }}>
                <div className="contenedor">
                    <div className="row">
                        <div className="col-md-12" style={{ marginBottom: '70px' }}>{''}</div> 
                        <div className="col-lg-12">
                            <div className="sidebar">
                                <h1 className="display-4">{cursa}</h1>
                                <div className="col-md-12" style={{ marginBottom: '50px' }}></div> 
                                <p className="lead">{docente} </p>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded mx-auto">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <form className="form-sample" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                                        <h5 className="mb-0" style={{ fontWeight: 'bold', fontSize: '24px' }}>Actividades pendientes</h5>
                                                    </div>
                                                    {/* ... (contenido del primer listado) */}
                                                    <div className="col">
                                                        <table className="table table-striped">
                                                            <thead className="table-dark">
                                                                <tr>
                                                                    <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Nombre</th>
                                                                    <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Estado</th>
                                                                    <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Laboratorio</th>
                                                                    <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Archivo</th>
                                                                    <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Acciones</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {practica.map((persona) => (
                                                                    <tr key={persona.id}>
                                                                        <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{persona.nombre}</td>
                                                                        <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{persona.estado ? 'PENDIENTE' : 'ENTREGADO'}</td>
                                                                        <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{persona.laboratorio ? 'SI' : 'NO'}</td>
                                                                        <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>
                                                                            <a href={`${URLBASE}/archivos/practicas/${persona.enlace_archivo}`} target="_blank" rel="noopener noreferrer">
                                                                                <Button
                                                                                    variant="btn btn-outline btn-rounded"
                                                                                    style={{
                                                                                        backgroundColor: '#9BA4B5',
                                                                                        borderColor: '#9BA4B5',
                                                                                        color: '#FFFFFF'
                                                                                    }}>

                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-filetype-pdf" viewBox="0 0 16 16">
                                                                                        <path fill-rule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z" />
                                                                                    </svg>
                                                                                </Button>
                                                                            </a>
                                                                        </td>
                                                                        <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>
                                                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                            <Button
                                                                                variant="btn btn-outline btn-rounded"
                                                                                onClick={() => {
                                                                                    handleShow();
                                                                                    obtenerDatosIngreso(persona.external_id);
                                                                                }}
                                                                                style={{
                                                                                    backgroundColor: '#9BA4B5',
                                                                                    borderColor: '#9BA4B5',
                                                                                    color: '#FFFFFF',
                                                                                }}
                                                                                disabled={!persona.estado} 
                                                                            >

                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-journal-arrow-up" viewBox="0 0 16 16">
                                                                                    <path fill-rule="evenodd" d="M8 11a.5.5 0 0 0 .5-.5V6.707l1.146 1.147a.5.5 0 0 0 .708-.708l-2-2a.5.5 0 0 0-.708 0l-2 2a.5.5 0 1 0 .708.708L7.5 6.707V10.5a.5.5 0 0 0 .5.5z" />
                                                                                    <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                                                                                    <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
                                                                                </svg>{" "}
                                                                                Entregar
                                                                            </Button>
                                                                            <Button
                                                                              href="#"
                                                                                variant="btn btn-outline btn-rounded"
                                                                                onClick={() => {
                                                                                    handleShow2();
                                                                                    obtenerDatosIngreso2(persona.external_id);
                                                                                }}
                                                                                style={{
                                                                                    
                                                                                    backgroundColor: '#9BA4B5',
                                                                                    borderColor: '#9BA4B5',
                                                                                    color: '#FFFFFF',
                                                                                }}>

                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                                                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                                                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                                                                </svg>{" "}Ver calificacion
                                                                            </Button>
                                                                        </div></td>
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
                                <Modal.Title>Entregar actividad</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <SubirActividad parametro={pracObt} ></SubirActividad>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Cerrar
                                </Button>

                            </Modal.Footer>
                        </Modal>
                    </div>
                     <div className="model_box">
                        <Modal
                            show={show2}
                            onHide={handleClose2}
                            backdrop="static"
                            keyboard={false}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Calificación</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ListaCalificacion parametro={pracObt2} ></ListaCalificacion>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose2}>
                                    Cerrar
                                </Button>

                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ListaPracticas;