import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import { ActualizarPersona, ChanceEstado, GuardarPersona, Roles } from '../hooks/Conexion';
import { useState } from 'react';
import mensajes from '../utilidades/Mensajes';
import { borrarSesion, getToken } from '../utilidades/Sessionutil';
import { useNavigate } from 'react-router-dom';

const CambiarEstado = ({ personaObtenida, handleChange }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navegation = useNavigate();

    const editar = async () => {

        var estado;

        if (personaObtenida.estado === "ACTIVO") {
            estado = true;
        } else if (personaObtenida.estado === "DADO DE BAJA") {
            estado = false;
        }

        var datos = {
            estado: estado,
            external: personaObtenida.external_id
        };

        ChanceEstado(datos, getToken()).then((info) => {
            if (info.code !== 200) {
                mensajes(info.msg, 'error', 'Error');
            } else {
                mensajes(info.msg);
                navegation('/act');
            }
        });
    }



    return (
        <div className="container">
            <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Editar datos del estudiante</h4>
                                <form className="form-sample" onSubmit={handleSubmit(() => editar())}>
                                    <p className="card-description">Datos personales</p>
                                    <div className="row">


                                        {/** ESCOGER TIPO DE IDENTIFICACION */}
                                        <div className="form-group">
                                            <label>Estado</label>
                                            <select className="form-control" {...register('estado', { required: true })} value={personaObtenida.estado} onChange={handleChange}>
                                                <option value="">Seleccione un estado</option>
                                                <option value="ACTIVO">ACTIVO</option>
                                                <option value="DADO DE BAJA">DADO DE BAJA</option>
                                            </select>
                                            {errors.estado && errors.estado.type === 'required' && (
                                                <div className="alert alert-danger">Seleccione un estado</div>
                                            )}
                                        </div>




                                        <div className="col-md-12" style={{ marginBottom: '10px' }}></div> {/* Espacio adicional */}

                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <a href="/paginaPincipal/listarAlumnos" className="btn btn-danger btn-rounded">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="bi bi-x-circle"
                                                viewBox="0 0 16 16"
                                            >
                                                <path
                                                    d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                                                />
                                                <path
                                                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                                                />
                                            </svg>
                                            <span style={{ marginLeft: '5px' }}>Cancelar</span>
                                        </a>
                                        <button
                                            className="btn btn-dark btn-lg btn-block"
                                            type="submit"
                                            style={{ backgroundColor: '#212A3E', width: '100%' }}
                                        >
                                            EDITAR
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


}

export default CambiarEstado;