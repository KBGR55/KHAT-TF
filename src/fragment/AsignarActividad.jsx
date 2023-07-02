import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';

function AsignarActividad() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navegation = useNavigate();
    const [nro, setNro] = useState(0);
    const [llActivity, setLlActivity] = useState(false);

    const onSubmit = (data) => {
        var datos = {
            "id": nro + 1,
            "tema": data.tema,
            "dueDate": data.dueDate,
            "materia": data.materia === "true"
        };

        setLlActivity(false);
    };

    return (
        <div className="wrapper">
            <div className="d-flex flex-column">
                <div className="content">

                    <div className='container-fluid'>
                        <div className="col-lg-10">
                            <div className="p-5">

                                <form className="user" onSubmit={handleSubmit(onSubmit)}>
                                    {/** INGRESAR tema */}
                                    <div className="form-group">
                                        <input type="text" {...register('tema', { required: true })} className="form-control form-control-user" placeholder="Ingrese el título" />
                                        {errors.tema && errors.tema.type === 'required' && <div className='alert alert-danger'>Ingrese el título</div>}
                                    </div>

                                    {/** INGRESAR Fecha entrega */}
                                    <label className="col-sm-3 col-form-label">Fecha de entrega</label>
                                    <div className="form-group">
                                        <input type="datetime-local" className="form-control form-control-user" placeholder="Ingrese la fecha de entrega"
                                            {...register('fechaEntrega', { required: true })} />
                                        {errors.fechaEntrega && errors.fechaEntrega.type === 'required' && (<div className='alert alert-danger'>Ingrese una fecha de entrega</div>)}
                                    </div>
                                    {/** INGRESAR materia */}
                                    <div className="form-group">
                                        <label >Materia: </label>
                                        <select className="form-control" {...register('materia', { required: true })}>
                                            <option value={true}>Desarrollo Basado en Plataformas</option>
                                            <option value={false}>Estructura de Datos</option>
                                        </select>
                                        {errors.materia && errors.materia.type === 'required' && (
                                            <div className='alert alert-danger'>Seleccione una opción</div>
                                        )}
                                    </div>

                                    {/** INGRESAR materia */}
                                    <div className="form-group">
                                        <label className="col-sm-3 col-form-label">Ciclo</label>
                                        <select className="form-control" {...register('ciclo', { required: true })}>
                                            {Array.from({ length: 9 }, (_, index) => (
                                                <option key={index}>Ciclo {index + 1}</option>
                                            ))}
                                        </select>
                                        {errors.ciclo && errors.ciclo.type === 'required' && (
                                            <div className='alert alert-danger'>Seleccione una opción</div>
                                        )}
                                    </div>

                                    {/** INGRESAR unidad */}
                                    <div className="form-group">
                                        <label className="col-sm-3 col-form-label">Unidad</label>
                                        <select className="form-control" {...register('unidad', { required: true })}>
                                            {Array.from({ length: 4 }, (_, index) => (
                                                <option key={index}>Unidad {index + 1}</option>
                                            ))}
                                        </select>
                                        {errors.unidad && errors.unidad.type === 'required' && (
                                            <div className='alert alert-danger'>Seleccione una opción</div>
                                        )}
                                    </div>

                                    <hr />

                                    {/** BOTÓN CANCELAR */}
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <a href="/paginaPrincipal" className="btn btn-danger btn-rounded">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                            </svg>
                                            <span style={{ marginLeft: '5px' }}>Cancelar</span>
                                        </a>

                                        {/** BOTÓN REGISTRAR */}
                                        <input className="btn btn-success btn-rounded" type='submit' value='Asignar actividad' style={{ backgroundColor: '#212A3E', width: '100%' }}></input>
                                    </div>

                                </form>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}
export default AsignarActividad;