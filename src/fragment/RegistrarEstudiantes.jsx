import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
const RegistrarEstudiantes = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        var datos = {
            "nombres": datos.nombres,
            "apellidos": datos.apellidos,
            "ntelefono": datos.ntelefono,
            "correo": data.correo,
            "clave": data.clave
            //Aqui los datos
        };
        console.log("Datos inicio:", datos);
        //Aqui va la funcion de registrarAlumno
    };
    return (
        <div className="container">
            <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                <div className="row">

                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Registar Alumno</h4>
                                <form className="form-sample" onSubmit={handleSubmit(onSubmit)}>
                                    <p className="card-description">Información del alumno</p>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label">Nombres completos</label>
                                                <div className="col-sm-9">
                                                    <input type="text" className="form-control" {...register('nombres', { required: true })} />
                                                    {errors.correo && errors.nombres.type === 'required' && <div className='alert alert-danger'>Ingrese los nombres</div>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label">Apellidos</label>
                                                <div className="col-sm-9">
                                                    <input type="text" className="form-control" {...register('apellidos', { required: true })} />
                                                    {errors.apellidos && errors.apellidos.type === 'required' && <div className='alert alert-danger'>Ingrese los apellidos</div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label">Género</label>
                                                <div className="col-sm-9">
                                                    <select className="form-control">
                                                        <option value="male">Masculino</option>
                                                        <option value="female">Femenino</option>
                                                        <option value="other">Otro</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label">Fecha de nacimiento</label>
                                                <div className="col-sm-9">
                                                    <input className="form-control" placeholder="dd/mm/yyyy" type="date" />
                                                </div>
                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label">Ciclo </label>
                                                    <div className="col-sm-9">
                                                        <select className="form-control">
                                                            {Array.from({ length: 9 }, (_, index) => (
                                                                <option key={index}>Ciclo {index + 1}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label">Número telefónico</label>
                                                    <div className="col-sm-9">
                                                        <input type="tel" className="form-control" placeholder="Ingrese su número telefónico" {...register('ntelefono', { required: true })} />
                                                        {errors.ntelefono && errors.ntelefono.type === 'required' && <div className='alert alert-danger'>Ingrese los nombres</div>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="card-description">Generar Credenciales</p>
                                    <div className="row">

                                        <div className="col-md-6">
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label">Correo electrónico</label>
                                                <div className="col-sm-9">
                                                    <input type="email" className="form-control" placeholder="Ingrese correo"  {...register('correo', { required: true, pattern: /^\S+@\S+$/i })} />
                                                    {errors.correo && errors.correo.type === 'required' && <div className='alert alert-danger'>Ingrese el correo</div>}
                                                    {errors.correo && errors.correo.type === 'pattern' && <div className='alert alert-danger'>Ingrese un correo valido</div>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label">Clave</label>
                                                <div className="col-sm-9">
                                                    <input type="password" className="form-control" placeholder="Ingrese clave" {...register('clave', { required: true })} />
                                                    {errors.clave && errors.clave.type === 'required' && <div className='alert alert-danger'>Ingrese una clave</div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/**<div className="pt-1 mb-4" style={{ textAlign: 'center' }} */}
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <a href="/paginaPincipal/listarAlumnos" className="btn btn-danger btn-rounded">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                            </svg>
                                            <span style={{ marginLeft: '5px' }}>Cancelar</span>
                                        </a>
                                        <button className="btn btn-dark btn-lg btn-block" type="submit" style={{ backgroundColor: '#212A3E', width: '100%' }}>REGISTRAR</button>
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

export default RegistrarEstudiantes;