import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import { GuardarPersona, Roles } from '../hooks/Conexion';
import { useState } from 'react';
import mensajes from '../utilidades/Mensajes';
import { borrarSesion, getToken } from '../utilidades/Sessionutil';
import { useNavigate } from 'react-router-dom';

const RegistrarEstudiantes = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navegation = useNavigate();

    //CONSTANTES PARA LLAMAR UNA VEZ AL SERVIDOR
    const [llRoles, setLlRoles] = useState(false);
    const [llPersonas, setLlPersonas] = useState(false);

    //DATOS
    const [data, setData] = useState([]);
    const [personaObtenida, setpersonaObtenida] = useState([]);
    const [rolSeleccionado, setRolSeleccionado] = useState([]);
    const [roles, setRoles] = useState([]);

    const onSubmit = (data) => {
        var datos = {
            "nombres": data.nombres,
            "apellidos": data.apellidos,
            "direccion": data.direccion,
            "identificacion": data.identificacion,
            "tipo_identificacion": data.tipo_identificacion,
            "direccion": data.direccion,
            "fecha_nacimiento": data.fecha_nacimiento,
            "external_rol": rolSeleccionado,
            "telefono": data.ntelefono,
            "correo": data.correo,
            "clave": data.clave
        };
        GuardarPersona(datos, getToken()).then((info) => {
            if (info.code !== 200) {
                mensajes(info.msg, 'error', 'Error');
            } else {
                mensajes(info.msg);
                navegation('/act');
            }
        }
        );
    };

    //LLAMADA A ROLES
    if (!llRoles) {
        Roles(getToken()).then((info) => {
            if (info.code !== 200 && info.msg == 'Acceso denegado. Token ha expirado') {
                borrarSesion();
                mensajes(info.msg);
                navegation("/sesion");
            } else {
                setRoles(info.info);
                setLlRoles(true);
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
                                <h4 className="card-title">Registrar Estudiante</h4>
                                <form className="form-sample" onSubmit={handleSubmit(onSubmit)}>
                                    <p className="card-description">Datos informativos</p>
                                    <div className="row">
                                        {/** INGRESAR NOMBRES */}
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Nombres completos</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
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
                                                    {...register('direccion', { required: true })}
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
                                                    {...register('ntelefono', { required: true })}
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
                                                <select className='form-control' {...register('tipo_identificacion', { required: true })}>
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

                                        {/** ESCOGER TIPO DE ROL 
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Rol</label>
                            <select
                              className='form-control'
                              {...register('rol', { required: true })}
                              onChange={(e) => setRolSeleccionado(e.target.value)}
                            >
                              <option>Seleccione un rol</option>
                              {roles.map((m, i) => (
                                <option key={i} value={m.external_id}>
                                  {m.tipo}
                                </option>
                              ))}
                            </select>
                            {errors.rol && errors.rol.type === 'required' && (
                              <div className='alert alert-danger'>Seleccione un rol</div>
                            )}
                          </div>
                        </div>*/}

                                        {/** ESCOGER TIPO DE ROL */}
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Tipo de Identificación</label>
                                                <select className='form-control' {...register('rol', { required: true })}>
                                                    <option value="">Seleccione un rol</option>
                                                    <option value="ESTUDIANTE">ESTUDIANTE</option>
                                                </select>
                                                {errors.rol && errors.rol.type === 'required' && (
                                                    <div className='alert alert-danger'>Seleccione un rol</div>
                                                )}
                                            </div>
                                        </div>

                                        {/** CORREO ELECTRÓNICO */}
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label>Correo electrónico</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="Ingrese correo"
                                                    {...register('correo', { required: true, pattern: /^\S+@\S+$/i })}
                                                />
                                                {errors.correo && errors.correo.type === 'required' && (
                                                    <div className='alert alert-danger'>Ingrese el correo</div>
                                                )}
                                                {errors.correo && errors.correo.type === 'pattern' && (
                                                    <div className='alert alert-danger'>Ingrese un correo </div>
                                                )}
                                            </div>
                                        </div>

                                        {/** CLAVE */}
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label>Clave</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Ingrese clave"
                                                    {...register('clave', { required: true })}
                                                />
                                                {errors.clave && errors.clave.type === 'required' && (
                                                    <div className='alert alert-danger'>Ingrese una clave</div>
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
                                            REGISTRAR
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

export default RegistrarEstudiantes;