import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import { ActualizarPersona, ChanceEstado, GuardarMatricula, GuardarPersona, Periodo, Roles } from '../hooks/Conexion';
import { useState } from 'react';
import mensajes from '../utilidades/Mensajes';
import { borrarSesion, getToken } from '../utilidades/Sessionutil';
import { useNavigate } from 'react-router-dom';

const GenerarMatricula = ({ personaObtenida, handleChange }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navegation = useNavigate();

    const [llPeriodo, setLlPeriodo] = useState(false);
    const [periodoSeleccionado, setPeriodoSeleccionado] = useState([]);
    const [periodo, setPeriodo] = useState([]);

    const onSubmit = (data) => {
        var datos = {
            "numero": data.numero,
            "fecha_registro": data.fecha_registro,
            "external_persona": personaObtenida.external_id,
            "external_periodo": periodoSeleccionado
        };
        GuardarMatricula(datos, getToken()).then((info) => {
            if (info.code !== 200) {
                mensajes(info.msg, 'error', 'Error');
            } else {
                mensajes(info.msg);
                navegation('/act');
            }
        }
        );
    };
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

    //LLAMADA A ROLES
    if (!llPeriodo) {
        Periodo(getToken()).then((info) => {
            if (info.code !== 200 && info.msg == 'Acceso denegado. Token ha expirado') {
                borrarSesion();
                mensajes(info.msg);
                navegation("/sesion");
            } else {
                setPeriodo(info.info);
                setLlPeriodo(true);
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

                                        {/** INGRESAR NUMERO */}
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Número</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    {...register('numero', { required: true })}
                                                />
                                                {errors.numero && errors.numero.type === 'required' && (
                                                    <div className='alert alert-danger'>Ingrese el numero</div>
                                                )}
                                            </div>
                                        </div>

                                        {/** INGRESAR FECHA DE REGISTRO */}
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Fecha de Registro</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    {...register('fecha_registro', { required: true })}
                                                />
                                                {errors.fecha_registro && errors.fecha_registro.type === 'required' && (
                                                    <div className='alert alert-danger'>Ingrese una fecha</div>
                                                )}
                                            </div>
                                        </div>

                                        {/** ESCOGER PERIODO*/}
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Periodo</label>
                                                <select
                                                    className='form-control'
                                                    {...register('periodo', { required: true })}
                                                    onChange={(e) => setPeriodoSeleccionado(e.target.value)}
                                                >
                                                    <option>Seleccione un rol</option>
                                                    {periodo.map((m, i) => (
                                                        <option key={i} value={m.external_id}>
                                                            {m.mes_comienzo} - {m.mes_culminacion} - {m.anio_periodo}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.periodo && errors.periodo.type === 'required' && (
                                                    <div className='alert alert-danger'>Seleccione un periodo</div>
                                                )}
                                            </div>
                                        </div>

                                        {/** INGRESAR NOMBRES */}
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Nombres completos</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={personaObtenida.nombres}
                                                    disabled
                                                />
                                            </div>
                                        </div>

                                        {/** INGRESAR APELLIDOS */}
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Apellidos</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={personaObtenida.apellidos}
                                                    disabled
                                                />

                                            </div>
                                        </div>

                                        {/** INGRESAR DIRECCION */}
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Dirección</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={personaObtenida.direccion}
                                                    disabled
                                                />
                                            </div>
                                        </div>


                                        {/** INGRESAR FECHA DE NACIMIENTO */}
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Fecha de Nacimiento</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    value={obtenerFechaFormateada(fechaString)}
                                                    disabled
                                                />

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
                                                    value={personaObtenida.telefono}
                                                    disabled
                                                />

                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <a href="/paginaPrincipal/listarregistros" className="btn btn-danger btn-rounded">
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
                                            style={{ backgroundColor: '#212A3E' }}
                                        >
                                            GENERAR
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

export default GenerarMatricula;

