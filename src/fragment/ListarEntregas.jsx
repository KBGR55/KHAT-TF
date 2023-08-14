import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Actualizar, Guardar, Listar, Obtener, URLBASE } from '../hooks/Conexion';
import mensajes from '../utilidades/Mensajes';
import { borrarSesion, getToken, getUser } from '../utilidades/Sessionutil';
import BarraNavegacion from './BarraNavegacion';
import { Button, FormControl, Modal, InputGroup } from 'react-bootstrap';
import AsignarActividad from './AsignarActividad';
import '../css/styleNombre.css';
import Calificar from './Calificar';
const ListarEntregas = () => {
    const { id } = useParams(); // Obtener el valor del parámetro "id" de la URL
    const [show, setShow] = useState(false);//Modal actividad
    const handleClose = () => setShow(false);//Modal actividad
    const handleShow = () => setShow(true);//Modal actividad
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navegation = useNavigate();
    const [llasignaturas, setLlasignaturas] = useState(false);//para listar asignaturas
    const { watch, setValue } = useForm();//para listar asignaturas
    const [participantes, setParticipantes] = useState([]);//para listar asignaturas
    const [pracObt, setPracObt] = useState([]);//

    async function listadoEntregas() {
        console.log("Noche bebe");
        try {
            const cursaInfo = await Listar(getToken(), `listar/entrega/practica/${id}`);
            if (cursaInfo.error === true || cursaInfo.msg === 'Token no valido o expirado!') {
                borrarSesion();
                mensajes(cursaInfo.msg);
            } else {
                setParticipantes(cursaInfo.info);
                console.log('Chocolate llega');
                console.log(cursaInfo);
            }
            if (cursaInfo.code !== 200) {
                mensajes(cursaInfo.msg);
            }
        } catch (error) {
            console.error("Error asignando cursa:", error);
        }
    }

    //ACCION OBTENER DATOS DE UN INGRESO
    const obtenerDatosIngreso = (id) => {
        setPracObt(id);
    };

    // En tu componente, puedes llamar a esta función dentro de un useEffect o un evento
    if (!llasignaturas) {
        setLlasignaturas(true);
        listadoEntregas();
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
                        <div className="col-md-12" style={{ marginBottom: '50px' }}></div> {/* Espacio adicional */}
                        <div className="col-md-12">
                            <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded mx-auto">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <form className="form-sample" encType="multipart/form-data">
                                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                                        <h5 className="mb-0" style={{ fontWeight: 'bold', fontSize: '34px' }}>Lista de actividades entregadas</h5>
                                                    </div>
                                                    {/* ... (contenido del primer listado) */}
                                                    <div className="col">
                                                        <table className="table table-striped">
                                                            <thead className="table-dark">
                                                                <tr>
                                                                    <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Fecha entrega</th>
                                                                    <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Comentario</th>
                                                                    <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Estado</th>
                                                                    <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Achivo</th>
                                                                    <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Calificar</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {participantes.map((persona) => (
                                                                    <tr key={persona.id}>
                                                                        <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{new Date(persona.fecha_entrega).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                                                        <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{persona.comentario}</td>
                                                                        <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{persona.estado ? 'SIN CALIFICAR' : 'CALIFICADO'}</td>
                                                                        <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>
                                                                            <a href={`${URLBASE}/archivos/entregas/${persona.enlace_archivo_entrega}`} target="_blank" rel="noopener noreferrer">
                                                                                <Button
                                                                                    variant="btn btn-outline btn-rounded"
                                                                                    // onClick={handleShow}
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
                                                                        <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}><div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                                                                                disabled={!persona.estado} // Deshabilitar si persona.estado es falso
                                                                            >
                                                                                Calificar
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFFFFF" class="bi bi-check2-circle" viewBox="0 0 16 16">
                                                                                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                                                                                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                                                                                </svg>
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
                            <Calificar parametro={pracObt} ></Calificar>
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

export default ListarEntregas;