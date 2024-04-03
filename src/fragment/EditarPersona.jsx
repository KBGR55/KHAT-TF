import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import mensajes from '../utilidades/Mensajes';
import { borrarSesion, getToken } from '../utilidades/Sessionutil';
import { ActualizarImagenes } from '../hooks/Conexion';

const EditarPersona = ({ personaObtenida, handleChange }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const navegation = useNavigate();
  const [file, setFile] = useState(null);

  const selectedHandler = e => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('nombres', data.nombres);
    formData.append('apellidos', data.apellidos);
    formData.append('direccion', data.direccion);
    formData.append('identificacion', data.identificacion);
    formData.append('tipo_identificacion', data.tipo_identificacion);
    formData.append('fecha_nacimiento', data.fecha_nacimiento);
    formData.append('telefono', data.telefono);
    formData.append('estado', data.estado);
    formData.append('external_id', personaObtenida.external_id);
    if (file) {
      formData.append('foto', file);
    }

    ActualizarImagenes(formData, getToken(), "/personas/actualizar").then((info) => {
      if (info.code !== 200 || info.msg === "TOKEN NO VALIDO O EXPIRADO") {
        mensajes(info.msg, 'error', 'Error');
        borrarSesion();
      } else {
        navegation('/act');
        mensajes(info.msg);
      }
    });
  };

  useEffect(() => {
    console.log(personaObtenida);
    setValue('nombres', personaObtenida.nombres);
    setValue('apellidos', personaObtenida.apellidos);
    setValue('direccion', personaObtenida.direccion);
    setValue('identificacion', personaObtenida.identificacion);
    setValue('tipo_identificacion', personaObtenida.tipo_identificacion);
    setValue('fecha_nacimiento', personaObtenida.fecha_nacimiento);
    setValue('telefono', personaObtenida.telefono);
    setValue('estado', personaObtenida.estado);
  }, [personaObtenida, setValue]);

  return (
    <div className="container">
      <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <form className="form-sample" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                  <p className="card-description">Datos informativos</p>
                  <div className="row">
                    {/** INGRESAR NOMBRES */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Nombres completos</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={personaObtenida.nombres} onChange={handleChange}
                          {...register('nombres', { required: true })}
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
                          defaultValue={personaObtenida.apellidos} onChange={handleChange}
                          {...register('apellidos', { required: true })}
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
                          defaultValue={personaObtenida.direccion} onChange={handleChange}
                          {...register('direccion', { required: true })}
                        />
                        {errors.direccion && errors.direccion.type === 'required' && (
                          <div className='alert alert-danger'>Ingrese una dirección</div>
                        )}
                      </div>
                    </div>
                    {/** INGRESAR NUMERO DE TELEFONO*/}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Número telefónico</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Ingrese su número telefónico"
                          defaultValue={personaObtenida.telefono} onChange={handleChange}
                          {...register('telefono', { required: true })}
                        />
                        {errors.ntelefono && errors.ntelefono.type === 'required' && (
                          <div className='alert alert-danger'>Ingrese un número telefónico</div>
                        )}
                      </div>
                    </div>
                    {/** INGRESAR IDENTIFICACION */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Identificación</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Ingrese la identificación"
                          defaultValue={personaObtenida.identificacion} onChange={handleChange}
                          {...register('identificacion', { required: true })}
                        />
                        {errors.identificacion && errors.identificacion.type === 'required' && (
                          <div className='alert alert-danger'>Ingrese una identificación</div>
                        )}
                      </div>
                    </div>
                    {/** ESCOGER TIPO DE IDENTIFICACION */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Tipo de Identificación</label>
                        <select className='form-control'
                          defaultValue={personaObtenida.tipo_identificacion} onChange={handleChange}

                          {...register('tipo_identificacion', { required: true })}>
                          <option value="">Seleccione un tipo de identificación</option>
                          <option value="CEDULA">CEDULA</option>
                          <option value="PASAPORTE">PASAPORTE</option>
                          <option value="RUC">RUC</option>
                        </select>
                        {errors.tipo_identificacion && errors.tipo_identificacion.type === 'required' && (
                          <div className='alert alert-danger'>Seleccione un tipo de identificación</div>
                        )}
                      </div>
                    </div>
                    {/** ESCOGER FOTO */}
                    <div className="col-md-6">
                      <div className="form-data">
                        <label>Foto</label>
                        <input
                          type="file"
                          className="form-control"
                          placeholder="Seleccionar una Foto"
                          onChange={selectedHandler}
                        />
                      </div>
                    </div>
                    {/** CAMBIAR ESTADO */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Estado</label>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            defaultChecked={personaObtenida.estado}
                            {...register('estado')}
                          />
                          <label className="form-check-label">{personaObtenida.estado ? "Seleccione para Desactivar Cuenta" : "Seleccione para Activar Cuenta"}</label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12" style={{ marginBottom: '10px' }}></div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <a href="/act" className="btn btn-danger btn-rounded">
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