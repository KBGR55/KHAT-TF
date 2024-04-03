import React from 'react';
import { useForm } from 'react-hook-form';
import mensajes from '../utilidades/Mensajes';
import { borrarSesion, getToken } from '../utilidades/Sessionutil';
import { GuardarDocumentos } from '../hooks/Conexion';

function AsignarActividad({ parametroLista }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    for (const cursas of parametroLista) {
      var formData = new FormData();
      formData.append('nombre', data.tema);
      formData.append('fecha_habilitada', data.fecha_habilitada);
      formData.append('fecha_entrega', data.fecha_entrega);
      formData.append('file', data.documento[0]);
      formData.append('laboratorio', data.laboratorio);
      formData.append('external_cursa', cursas.external_id);
      console.log(cursas.external_id);
      console.log("DATOS ENVIADOS");
      console.log(formData);
      try {
        const cursaInfo = await GuardarDocumentos(formData, getToken());
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

    }
  };

  return (
    <div className="wrapper">
      <div className="d-flex flex-column">
        <div className="content">
          <div className='container-fluid'>
            <div className="col-lg-10">
              <div className="p-5">
                <form className="user" onSubmit={handleSubmit(onSubmit)}>
                  <div className="col-md-12" style={{ marginBottom: '10px' }}></div>
                  <div className="form-group">
                    <label>Nombre</label>
                    <input type="text" {...register('tema', { required: true })} className="form-control form-control-user" placeholder="Ingrese el título" />
                    {errors.tema && errors.tema.type === 'required' && <div className='alert alert-danger'>Ingrese el título</div>}
                  </div>
                  <div className="col-md-12" style={{ marginBottom: '10px' }}></div>
                  <div className="form-group">
                    <label>Fecha entrega habilitada</label>

                    <input type="datetime-local" className="form-control form-control-user" placeholder="Ingrese la fecha de entrega habilitada"
                      {...register('fecha_habilitada', { required: true })} />
                    {errors.fecha_habilitada && errors.fecha_habilitada.type === 'required' && (<div className='alert alert-danger'>Ingrese una fecha para habilitar la entrega</div>)}
                  </div>
                  <div className="col-md-12" style={{ marginBottom: '10px' }}></div>
                  <div className="form-group">
                    <label>Fecha de entrega</label>
                    <input type="datetime-local" className="form-control form-control-user" placeholder="Ingrese la fecha de entrega"
                      {...register('fecha_entrega', { required: true })} />
                    {errors.fecha_entrega && errors.fecha_entrega.type === 'required' && (<div className='alert alert-danger'>Ingrese una fecha de entrega</div>)}
                  </div>
                  <div className="col-md-12" style={{ marginBottom: '10px' }}></div>
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
                  <div className="col-md-12" style={{ marginBottom: '10px' }}></div>
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="laboratorio" {...register('laboratorio')} />
                    <label className="form-check-label" htmlFor="laboratorio">Laboratorio</label>
                  </div>
                  <div className="col-md-12" style={{ marginBottom: '30px' }}></div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <a href="/inicio" className="btn btn-danger btn-rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                      </svg>
                      <span style={{ marginLeft: '5px' }}>Cancelar</span>
                    </a>
                    <input className="btn btn-success btn-rounded" type='submit' value='Asignar actividad' style={{ backgroundColor: '#212A3E', width: '100%' }}></input>
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
export default AsignarActividad;