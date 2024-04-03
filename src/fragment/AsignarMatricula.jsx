import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import { Guardar, Listar, Obtener } from '../hooks/Conexion';
import mensajes from '../utilidades/Mensajes';
import { borrarSesion, getToken} from '../utilidades/Sessionutil';
import BarraNavegacion from './BarraNavegacion';
import 'mdb-ui-kit/css/mdb.min.css';
import Button from 'react-bootstrap/Button'

const AsignarMatricula = () => {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();
  const [asignaturas, setasignaturas] = useState([]);//para listar asignaturas
  const [asignaturasEscogidas, setAsignaturasEscogidas] = useState([]);//para listar asignaturas escogidas
  const [llasignaturas, setLlasignaturas] = useState(false);//para listar asignaturas
  const [cursa, setCursa] = useState();//para cursa
  const [periodo, setPeriodo] = useState([]);//para periodo
  const [personaObtenida, setPersonaObtenida] = useState([]);//para estudiante datos tabla


  const onSubmit = async (data) => {
    var datosMatricula = {
      "external_persona": personaObtenida[0].persona.external_id,
      "external_periodo": periodo.external_id,
    };
    console.log("DATOS MATRICULA: " + datosMatricula.external_periodo + " " + datosMatricula.external_persona);
      const matriculaInfo = await Guardar(datosMatricula, getToken(), "guardar/matricula");
      
      if (matriculaInfo.error === true || matriculaInfo.msg === 'Token no valido o expirado!') {
        borrarSesion();
        mensajes(matriculaInfo.msg);
      } else {
        setCursa(matriculaInfo.info.matricula);
        console.log(cursa);
        matricular(matriculaInfo.info.matricula);
      }
      if (matriculaInfo.code !== 200) {
        mensajes(matriculaInfo.msg);
      }
  };

  const matricular= async (cursar) => {
          for (const asignatura of asignaturasEscogidas) {
            var datosCursa = {
              "external_cursa": asignatura.external_id,
              "external_matricula": cursar,
            };
            console.log(datosCursa);
            
            try {
              const cursaInfo = await Guardar(datosCursa, getToken(), "asignar/matricula/cursa");
              
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
  
  if (!llasignaturas) {
    //PERIODO
    Listar(getToken(), "listar/activo/periodo").then((info) => {
      if (info.error === true || info.msg === 'Token no valido o expirado!') {
        borrarSesion();
        mensajes(info.msg);
      } else {
        if (Array.isArray(info.info)) {
          console.log("boba");
          setPeriodo(info.info[0]);
        } else if (typeof info.info === 'object') {
          setPeriodo(info.info[0]);
        } else {
          console.error("No es un array válido");
        }
      }
    });
    //ASIGNATURA
    Listar(getToken(), "listar/asignatura/cursa").then((info) => {
      if (info.error === true || info.msg === 'Token no valido o expirado!') {
        borrarSesion();
        mensajes(info.msg);
      } else {
        console.log(info.info);
        if (Array.isArray(info.info)) {
          setasignaturas(info.info);
        } else if (typeof info.info === 'object') {
          setasignaturas(info.info);
        } else {
          console.error("No es un array válido");
        }
      }
    });
    setLlasignaturas(true);
  }

  useEffect(() => {
    setLlasignaturas(false);
  }, []);

  const buscarEstudiante = (identificacion) => {
    Obtener(getToken(), `obtener/estudiante/persona/${identificacion}`).then((info) => {
      if (info.error === true || info.msg === 'Token no valido o expirado!') {
        borrarSesion();
        mensajes(info.msg);
      } else {
        if (Array.isArray(info.info)) {
          setPersonaObtenida([info.info]);
        } else if (typeof info.info === 'object') {
          setPersonaObtenida([info.info]);
        } else {
          console.error("No es un array válido");
        }
      }
      if (info.code !== 200) {
        mensajes(info.msg);
      }
    });
  };

  // Agregar asignatura seleccionada a la lista asignaturasEscogidas
  const handleSelectAsignatura = (e) => {
    const selectedAsignaturaId = e.target.value;
    const selectedAsignatura = asignaturas.find(asignatura => asignatura.external_id === selectedAsignaturaId);
    if (selectedAsignatura) {
      // Verificar si la asignatura ya está en la lista
      if (!asignaturasEscogidas.some(asignatura => asignatura.external_id === selectedAsignaturaId)) {
        setAsignaturasEscogidas(prevAsignaturas => [...prevAsignaturas, selectedAsignatura]);
      } else {
        // La asignatura ya está en la lista, puedes mostrar una advertencia si lo deseas
        console.log("La asignatura ya fue seleccionada.");
      }
    }
  };
  //Eliminar al asignatura de la lista escogida
  const handleRemoveAsignatura = (externalId) => {
    setAsignaturasEscogidas(prevAsignaturas =>
      prevAsignaturas.filter(asignatura => asignatura.external_id !== externalId)
    );
  };

  return (
    <div id="root" className="d-flex justify-content-center align-items-center vh-100">
      <BarraNavegacion></BarraNavegacion>
      <div className="container datos-container" style={{ maxWidth: '800px', marginLeft: '150px' }}>
        <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <p className="card-description" style={{ fontWeight: 'bold', fontSize: '24px' }} >Datos para matricula</p>
                  {/* PERIODO*/}
                  <div className="row">

                    <div className="col-md-6">
                      <div className="form-group">
                        <h5 className="mb-0" style={{ fontWeight: 'bold', fontSize: '16px' }}>Periodo: {new Date(periodo.comienzo).toLocaleDateString()} - {new Date(periodo.culminacion).toLocaleDateString()}</h5>
                        <div className="col-md-12" style={{ marginBottom: '10px' }}>

                        </div> {/* Espacio adicional */}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12" style={{ marginBottom: '10px' }}></div> {/* Espacio adicional */}
                  {/*IDENTIFICACION ESTUDIANTE*/}
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <h5 className="mb-0" style={{ fontWeight: 'bold', fontSize: '16px' }}>Identificacion del estudiante</h5>
                        <div className="col-md-12" style={{ marginBottom: '5px' }}></div> {/* Espacio adicional */}
                        <input
                          type="text"
                          className="form-control"
                          {...register('identificacion', { required: true, min: 10 })}
                        />
                        {errors.identificacion && errors.identificacion.type === 'required' && (
                          <div className='alert alert-danger'>Ingrese una identificacion</div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6 d-flex align-items-end">
                      <Button
                        variant="dark"
                        style={{ backgroundColor: "#212A3E", border: "none" }}
                        onClick={() => {
                          const identificacionValue = watch('identificacion');
                          if (identificacionValue) {
                            buscarEstudiante(identificacionValue);
                          } else {
                            console.log('Ingrese una identificacion antes de buscar');
                          }
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                      </Button>
                    </div>
                  </div>

                  <div className="col-md-12 my-3">
                  </div> {/* Espacio adicional */}
                  <form className="form-sample" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" noValidate >
                    <div className="col-lg-8 mx-auto">
                      <div className="card bg-primary text-white rounded-3" style={{ boxShadow: 'none', border: 'none' }}>
                        <div className="card-body" style={{ background: '#F1F6F9', borderRadius: '5px', maxWidth: '1000px' }}>
                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="mb-0" style={{ fontWeight: 'bold', fontSize: '16px', color: "#212A3E" }}>Datos informativos</h5>
                          </div>
                          <div className="col">
                            <table className="table table-striped">
                              <thead className="table-dark">
                                <tr>
                                  <th className="text-center" style={{ backgroundColor: "#394867", color: "#F1F6F9", border: "none", fontWeight: 'bold' }}>Apellidos</th>
                                  <th className="text-center" style={{ backgroundColor: "#394867", color: "#F1F6F9", border: "none", fontWeight: 'bold' }}>Nombres</th>
                                </tr>
                              </thead>
                              <tbody>
                                {personaObtenida.map((estudiante) => (
                                  <tr key={estudiante.id}>
                                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{estudiante.persona.apellidos}</td>
                                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{estudiante.persona.nombres}</td>

                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/** ESCOGER ASIGNATURA */}
                    <div className="col-md-12">
                      <div className="form-group">
                        <h5 className="mb-0" style={{ fontWeight: 'bold', fontSize: '16px' }}>Asignaturas</h5>
                        <div className="col-md-12" style={{ marginBottom: '5px' }}></div> {/* Espacio adicional */}
                        <select
                          className='form-control'
                          {...register('external_asignatura', { required: true })}
                          value={watch('external_asignatura')}
                          onChange={(e) => {
                            setValue('external_asignatura', e.target.value);
                            handleSelectAsignatura(e); // Llama a la función para agregar la asignatura escogida
                          }}
                        >
                          <option value="">Seleccione</option>
                          {Array.isArray(asignaturas) && asignaturas.map((mar, i) => (
                            <option key={i} value={mar.external_id}>
                              {mar.asignatura.nombre}
                            </option>
                          ))}
                        </select>
                        {errors.external_asignatura && errors.external_asignatura.type === 'required' && <div className='alert alert-danger'>Seleccione una materia</div>}
                      </div>
                    </div>

                    <div className="col-md-12" style={{ marginBottom: '10px' }}></div> {/* Espacio adicional */}

                    <div className="col-md-12" style={{ marginBottom: '10px' }}></div> {/* Espacio adicional */}


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
                        MATRICULAR
                      </button>

                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div >
      <div className="col-lg-5" style={{ marginRight: '100px' }}>
        <div className="card bg-primary text-white rounded-3">
          <div className="card-body" style={{ background: '#394867', borderRadius: '5px', maxWidth: '800px' }}>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="mb-0" style={{ fontWeight: 'bold' }}>ASIGNATURAS ESCOGIDAS</h5>
            </div>

            <div className="col">
              <table className="table table-striped">
                <thead className="table-dark">
                  <tr>
                    <th className="text-center" style={{ backgroundColor: "#F1F6F9", color: "#394867", border: "none", fontWeight: 'bold' }}>Nombre asignatura</th>
                    <th className="text-center" style={{ backgroundColor: "#F1F6F9", color: "#394867", border: "none", fontWeight: 'bold' }}>Acciones</th>

                  </tr>
                </thead>
                <tbody>
                  {asignaturasEscogidas.map((asignatura) => (
                    <tr key={asignatura.id}>
                      <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{asignatura.asignatura.nombre}</td>
                      <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <Button
                            variant="dark"
                            style={{ backgroundColor: '#394867' }}
                            onClick={() => handleRemoveAsignatura(asignatura.external_id)} // Llama a la función de eliminación
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

          </div>
        </div>
      </div>


    </div >
  );
}

export default AsignarMatricula;