import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
const SubirActividad = () => {

    const { handleSubmit, register, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        //Guardar y enviar datos
    };

    return (
        <div className="wrapper">
            <div className="d-flex flex-column">
                <div className="content">
                    <div className='container-fluid'>
                        <div className="col-lg-10">
                            <div className="p-5">
                                <form className="form-sample" onSubmit={handleSubmit(onSubmit)}>
                                    <p className="card-description">Subir Actividad</p>
                                    {/** INGRESAR Titulo */}
                                    <div className="form-group">
                                        <input type="text" {...register('titulo', { required: true })} className="form-control form-control-user" placeholder="Ingrese el titulo" />
                                        {errors.titulo && errors.titulo.type === 'required' && <div className='alert alert-danger'>Ingrese un titulo</div>}
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="pdfFile">Selecciona un archivo PDF:</label>
                                                <input
                                                    type="file"
                                                    className={`form-control ${errors.pdfFile ? 'is-invalid' : ''}`}
                                                    id="pdfFile"
                                                    accept=".pdf"
                                                    {...register('pdfFile', { required: true })}
                                                />
                                                {errors.pdfFile && (<div className="invalid-feedback">Selecciona un archivo PDF.</div>)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Comentario: </label>
                                        <textarea className="form-control form-control-user" placeholder="Ingrese un comentario"></textarea>
                                    </div>
                                    <hr />
                                    {/** BOTÓN CANCELAR */}
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <a href="/inicio/listarActividades" className="btn btn-danger btn-rounded">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                            </svg>
                                            <span style={{ marginLeft: '5px' }}>Cancelar</span>
                                        </a>

                                        {/** BOTÓN REGISTRAR */}
                                        <input className="btn btn-success btn-rounded" type='submit' value='Subir' style={{ backgroundColor: '#212A3E', width: '100%' }}></input>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubirActividad;