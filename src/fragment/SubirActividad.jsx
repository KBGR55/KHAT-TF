import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import mensajes from '../utilidades/Mensajes';
import { borrarSesion, getToken } from '../utilidades/Sessionutil';
import { GuardarDocumentosEntrega } from '../hooks/Conexion';

function SubirActividad({ parametro }) {
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        var formData = new FormData();
        formData.append('external_practica', parametro);
        formData.append('file', data.documento[0]); // Agregar el archivo a FormData
        formData.append('comentario', data.comentario);
        console.log("DATOS ENVIADOS");
        try {
            const cursaInfo = await GuardarDocumentosEntrega(formData, getToken());
            if (cursaInfo.error === true || cursaInfo.msg === 'Token no valido o expirado!') {
                borrarSesion();
                mensajes(cursaInfo.msg);
            } else {
                mensajes(cursaInfo.msg);
            }

            if (cursaInfo.code !== 200) {
                mensajes(cursaInfo.msg);
            }
        } catch (error) {
            console.error("Error asignando cursa:", error);
        }
        console.log(formData);
    };

    useEffect(() => {
        console.log(parametro);
    }, [parametro]);
    
    return (
        <div className="wrapper">
            <div className="d-flex flex-column">
                <div className="content">

                    <div className='container-fluid'>
                        <div className="col-lg-10">
                            <div className="p-5">
                                <div className="col-md-12" style={{ marginBottom: '10px' }}></div> {/* Espacio adicional */}

                                {/** INGRESAR nombre */}
                                <h5 className="mb-0" style={{ fontWeight: 'bold', fontSize: '24px' }}>Actividad:</h5>
                                <form className="user" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="col-md-12" style={{ marginBottom: '10px' }}></div> {/* Espacio adicional */}
                                    {/**INGRESAR ARCHIVO */}
                                    <div className="col-md-12">
                                        <div className="form-data">
                                            <label>Selecciona un archivo PDF:</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                accept=".pdf"
                                                placeholder="Seleccionar un archivo"
                                                {...register('documento')}
                                            />
                                        </div>
                                    </div>
                                    {/**INGRESAR COMENTARIO*/}
                                    <div className="col-md-12" style={{ marginBottom: '10px' }}></div> {/* Espacio adicional */}
                                    <div className="form-group">
                                        <label>Comentario: </label>

                                        <textarea  {...register('comentario')} className="form-control form-control-user" placeholder="Ingrese un comentario"></textarea>
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
                                        <input className="btn btn-success btn-rounded" type='submit' value='Entregar actividad' style={{ backgroundColor: '#212A3E', width: '100%' }}></input>
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
export default SubirActividad;
