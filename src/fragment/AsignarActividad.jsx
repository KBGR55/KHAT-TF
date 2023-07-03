import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import mensajes from '../utilidades/Mensajes';
import { Asignatura } from '../hooks/Conexion';
import { borrarSesion } from '../utilidades/Sessionutil';
import { GuardarPractica } from '../hooks/Conexion';

function AsignarActividad() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navegation = useNavigate();
    const [nro, setNro] = useState(0);
    const [llActivity, setLlActivity] = useState(false);
    const [asignaturas, setasignaturas] = useState([]);//para listar asignaturas
    const [llasignaturas, setLlasignaturas] = useState(false);//para listar asignaturas
    const { watch, setValue } = useForm();//para listar asignaturas
    const onSubmit = (data) => {
        var datos = {
            "nombre": data.tema,
            "external_id_cursa": data.external_id_cursa,
            "fecha_entrega": data.fechaEntrega
        };
        GuardarPractica(datos).then((info) => {
            console.log(datos);
            if (info.error === true) {
              mensajes(info.msg, 'error', 'Error');
            } else {
              mensajes(info.msg);
              navegation("/practicas");
            }
          }
          );
        setLlActivity(false);
    };

    if (!llasignaturas) {
        Asignatura().then((info) => {
          if (info.error === true || info.msg === 'Token no valido o expirado!') {
            borrarSesion();
            mensajes(info.msg);
          } else {
            if (Array.isArray(info.info)) {
              setasignaturas(info.info);
              setLlasignaturas(true);
            } else if (typeof info.info === 'object') {
              setasignaturas([info.info]);
              setLlasignaturas(true);
            } else {
              console.error("No es un array válido");
            }
          }
        });
      }

      useEffect(() => {
        setLlasignaturas(false);
      }, []);
    
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

                                    {/* ESCOGER AUTO */}
                                    <div className="form-group">
                                        <select className='form-control' {...register('external_id_cursa', { required: true })} value={watch('external_id_cursa')} onChange={(e) => setValue('external_id_cursa', e.target.value)}>
                                            <option value="">Elija una materia</option>
                                            {Array.isArray(asignaturas) && asignaturas.map((mar, i) => (
                                                <option key={i} value={mar.external_id}>
                                                    {mar.nombre}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.external_id_cursa && errors.external_id_cursa.type === 'required' && <div className='alert alert-danger'>Seleccione una materia</div>}
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