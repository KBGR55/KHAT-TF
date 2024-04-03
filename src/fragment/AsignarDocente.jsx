import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import { Guardar, Listar } from '../hooks/Conexion';
import mensajes from '../utilidades/Mensajes';
import { borrarSesion, getToken } from '../utilidades/Sessionutil';
import BarraNavegacion from './BarraNavegacion';

const AsignarDocente = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [docentes, setDocenteSeleccionado] = useState([]);
  const [asignaturas, setasignaturas] = useState([]);//para listar asignaturas
  const [llasignaturas, setLlasignaturas] = useState(false);//para listar asignaturas
  const { watch, setValue } = useForm();//para listar asignaturas

  const onSubmit = (data) => {
    var datos = {
      "cedula_docente": data.cedula_docente,
      "external_asignatura": data.external_asignatura,
      "cupos": data.cupos
    };
    console.log("ENVIA"+JSON.stringify(datos));
    Guardar(datos, getToken(),'asignar/docente').then((info) => {
      console.log(datos);
      if (info.error === true) {
        mensajes(info.msg, 'error', 'Error');
      } else {
        data.cupos=0;
        mensajes(info.msg);
        setLlasignaturas(false);
      }
    }
    );
  };
  if (!llasignaturas) {
    Listar(getToken(), "listar/asignatura").then((info) => {
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
    Listar(getToken(), "listar/docente/rol").then((info) => {
      if (info.error === true || info.msg === 'Token no valido o expirado!') {
        borrarSesion();
        mensajes(info.msg);
      } else {
        if (Array.isArray(info.info)) {
          setDocenteSeleccionado(info.info);
        } else if (typeof info.info === 'object') {
          setDocenteSeleccionado([info.info]);
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
    <div id="root" className=" d-flex justify-content-center align-items-center vh-100">
      <BarraNavegacion></BarraNavegacion>
      <div className="container">
        <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <form className="form-sample" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <p className="card-description" style={{ fontWeight: 'bold', fontSize: '24px' }} >Datos informativos</p>
                    <div className="row">
                      {/** INGRESAR CUPOS*/}
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Cupos</label>
                          <input type="number" className="form-control" {...register('cupos', { required: true, min: 5, max: 35 })} />
                          {errors.cupos && errors.cupos.type === 'required' && (<div className='alert alert-danger'>Ingrese los cupos</div>)}
                          {errors.cupos && errors.cupos.type === 'min' && (<div className='alert alert-danger'>El número de cupos debe ser al menos 5</div>)}
                          {errors.cupos && errors.cupos.type === 'max' && (<div className='alert alert-danger'>El número de cupos no debe exceder 35</div>)}
                        </div>
                      </div>
                      <div className="col-md-12" style={{ marginBottom: '10px' }}></div> {/* Espacio adicional */}
                      {/** ESCOGER TIPO DE DOCENTE */}
                      <div className="col-md-12">
                        <div className="form-group">
                          <select className='form-control' {...register('cedula_docente', { required: true })} value={watch('cedula_docente')} onChange={(e) => setValue('cedula_docente', e.target.value)}>
                            <option value="">Elija un docente</option>
                            {Array.isArray(docentes) && docentes.map((docente, i) => (
                              <option key={i} value={docente.persona.identificacion}>
                                {docente.persona.apellidos + " " + docente.persona.nombres}
                              </option>
                            ))}
                          </select>
                          {errors.cedula_docente && errors.cedula_docente.type === 'required' && <div className='alert alert-danger'>Seleccione un docente</div>}
                        </div>
                      </div>
                      <div className="col-md-12" style={{ marginBottom: '10px' }}></div> {/* Espacio adicional */}


                      {/** ESCOGER ASIGNATURA */}
                      <div className="col-md-12">
                        <div className="form-group">
                          <select className='form-control' {...register('external_asignatura', { required: true })}
                            value={watch('external_asignatura')} onChange={(e) => setValue('external_asignatura', e.target.value)}>
                            <option value="">Elija una materia</option>
                            {Array.isArray(asignaturas) && asignaturas.map((mar, i) => (
                              <option key={i} value={mar.external_id}>
                                {mar.nombre}
                              </option>
                            ))}
                          </select>
                          {errors.external_asignatura && errors.external_asignatura.type === 'required' && <div className='alert alert-danger'>Seleccione una materia</div>}
                        </div>
                      </div>
                      <div className="col-md-12" style={{ marginBottom: '10px' }}></div> {/* Espacio adicional */}

                    </div>
                    <div className="d-flex justify-content-between">
                      <a href="/inicio" className="btn btn-danger btn-rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16" >
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                          />
                        </svg>
                        <span style={{ marginLeft: '5px' }}>CANCELAR</span>
                      </a>
                      <button
                        className="btn btn-dark btn-lg btn-block"
                        type="submit"
                        style={{ backgroundColor: '#212A3E', width: '100%' }}
                      >
                        REGISTRAR
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div >
  );
}

export default AsignarDocente;