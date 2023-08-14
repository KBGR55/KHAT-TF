import React, {useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import mensajes from '../utilidades/Mensajes';
import { getToken } from '../utilidades/Sessionutil';
import { Guardar } from '../hooks/Conexion';

function Calificar({ parametro }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navegation = useNavigate();

    const onSubmit = async (data) => {
        console.log("Noche bebe");
        var datos = {
            "external_id": parametro,
            "nota": data.nota,
        };
        Guardar(datos, getToken(), 'calificar/entrega').then((info) => {
            console.log(datos);
            if (info.error === true) {
                mensajes(info.msg, 'error', 'Error');
                navegation('/inicio');
            } else {
                data.cupos = 0;
                mensajes(info.msg);
            }
        }
        );
    };

    useEffect(() => {
    }, []);
    return (
        <div className="wrapper">
            <div className="d-flex flex-column">
                <div className="content">
                    <div className='container-fluid'>
                        <div className="col-lg-10">
                            <div className="p-5">
                                <div className="col-md-12" style={{ marginBottom: '10px' }}></div> {/* Espacio adicional */}
                                <h5 className="mb-0" style={{ fontWeight: 'bold', fontSize: '24px' }}>Calificación:</h5>
                                <form className="user" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="col-md-12" style={{ marginBottom: '10px' }}></div> {/* Espacio adicional */}
                                    {/** INGRESAR CALIFICACION */}
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="number" step="any" className="form-control" {...register('nota', { required: true, min: 0 })} />
                                            {errors.nota && errors.nota.type === 'required' && ( <div className='alert alert-danger'>Ingrese una calificacion</div>)}
                                            {errors.nota && errors.nota.type === 'min' && (<div className='alert alert-danger'>La calificación debe ser un mínimo de 0</div>)}
                                        </div>
                                    </div>
                                    <div className="col-md-12" style={{ marginBottom: '30px' }}></div> {/* Espacio adicional */}
                                    {/** BOTÓN CANCELAR */}
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <a href="/inicio" className="btn btn-danger btn-rounded">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                            </svg>
                                            <span style={{ marginLeft: '5px' }}>Cancelar</span>
                                        </a>
                                        {/** BOTÓN REGISTRAR */}
                                        <input className="btn btn-success btn-rounded" type='submit' value='Asignar' style={{ backgroundColor: '#212A3E', width: '100%' }}></input>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}
export default Calificar;