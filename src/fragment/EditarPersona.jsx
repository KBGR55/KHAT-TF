import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import { ActualizarPersona, GuardarPersona, Roles } from '../hooks/Conexion';
import { useState } from 'react';
import mensajes from '../utilidades/Mensajes';
import { borrarSesion, getToken } from '../utilidades/Sessionutil';
import { useNavigate } from 'react-router-dom';

const EditarPersona = ({personaObtenida, handleChange}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navegation = useNavigate();


    //CAMBIAR FORMATO FECHA
    const fechaString = personaObtenida.fecha_nacimiento;

    const obtenerFechaFormateada = (fechaString) => {
        const fecha = new Date(fechaString);
        fecha.setDate(fecha.getDate() + 1); // Ajustar la fecha sumando 1 día
        const year = fecha.getFullYear();
        const month = ('0' + (fecha.getMonth() + 1)).slice(-2);
        const day = ('0' + fecha.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
      };

    const editar = async () => {

        var datos = {
          "nombres": personaObtenida.nombres,
          "apellidos": personaObtenida.apellidos,
          "direccion": personaObtenida.direccion,
          "fecha_nacimiento": personaObtenida.fecha_nacimiento,
          "telefono": personaObtenida.telefono,
          "external": personaObtenida.external_id
        };
    
        ActualizarPersona(datos, getToken()).then((info) => {
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
                        {/** INGRESAR NOMBRES */}
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Nombres completos</label>
                            <input
                              type="text"
                              className="form-control"
                              {...register('nombres', { required: true })}
                              value={personaObtenida.nombres} onChange={handleChange}
                            />
                            {errors.nombres && errors.nombres.type === 'required' && (
                              <div className='alert alert-danger'>Ingrese los nombres</div>
                            )}
                            
                          </div>
                        </div>
      
                        {/** INGRESAR APELLIDOS */}
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Apellidos</label>
                            <input
                              type="text"
                              className="form-control"
                              {...register('apellidos', { required: true })}
                              value={personaObtenida.apellidos} onChange={handleChange}
                            />
                            {errors.apellidos && errors.apellidos.type === 'required' && (
                              <div className='alert alert-danger'>Ingrese los apellidos</div>
                            )}
                            
                          </div>
                        </div>
      
                        {/** INGRESAR DIRECCION */}
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Dirección</label>
                            <input
                              type="text"
                              className="form-control"
                              {...register('direccion', { required: true })}
                              value={personaObtenida.direccion} onChange={handleChange}
                            />
                            {errors.direccion && errors.direccion.type === 'required' && (
                              <div className='alert alert-danger'>Ingrese una dirección</div>
                            )}
                            
                          </div>
                        </div>

      
                        {/** INGRESAR FECHA DE NACIMIENTO */}
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Fecha de Nacimiento</label>
                            <input
                              type="date"
                              className="form-control"
                              {...register('fecha_nacimiento', { required: true })}
                              value={obtenerFechaFormateada(fechaString)} onChange={handleChange}
                            />
                            {errors.fecha_nacimiento && errors.fecha_nacimiento.type === 'required' && (
                              <div className='alert alert-danger'>Ingrese una fecha</div>
                            )}
                            
                          </div>
                        </div>
      
                        {/** INGRESAR NUMERO DE TELEFONO*/}
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Número telefónico</label>
                            <input
                              type="tel"
                              className="form-control"
                              placeholder="Ingrese su número telefónico"
                              {...register('telefono', { required: true })}
                              value={personaObtenida.telefono} onChange={handleChange}
                            />
                            {errors.telefono && errors.telefono.type === 'required' && (
                              <div className='alert alert-danger'>Ingrese un número telefónico</div>
                            )}
                            
                          </div>
                        </div>
      
                        <div className="col-md-12" style={{ marginBottom: '10px' }}></div> {/* Espacio adicional */}
      
                      </div>
                      <div className="d-flex justify-content-between">
                        <a href="/paginaPrincipal/listarAlumnos" className="btn btn-danger btn-rounded">
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

export default EditarPersona;