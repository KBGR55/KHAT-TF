import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import { InicioSesion } from '../hooks/Conexion'
import { getToken, saveRol, saveToken, saveUser } from '../utilidades/Sessionutil';
import { useNavigate } from 'react-router';
import mensajes from '../utilidades/Mensajes';
import logo from '../logo.jpg';

const Login = () => {
    const navegation = useNavigate();
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const onSubmit = (data) => {
        var datos = {
            "correo": data.correo,
            "clave": data.clave
        };

        InicioSesion(datos).then((info) => {
            var infoAux = info.info
            if (info.code !== 200) {
                mensajes(info.msg, "error", "error")
            } else {
                saveToken(infoAux.token);
                saveRol(infoAux.user.rol);
                console.log("lghjg"+infoAux.user.user);
                saveUser(infoAux.user.user);
                console.log("Token"+getToken());
                navegation("/inicio");
                mensajes(info.msg);
            }
        })
    };
    const correoValue = watch('correo');
    const claveValue = watch('clave');
    return (

        <section className="vh-100" style={{ backgroundColor: '#394867' }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card" style={{ 'border-radius': '1rem' }}>
                            <div className="row g-0">

                                <div className="col-md-6 col-lg-5 d-none d-md-block" style={{ textAlign: 'center', lineHeight: '100%' }}>
                                    <img src={logo} alt="logo KHAT" class="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5" style={{ borderRadius: '1rem 0 0 1rem' }} />
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">

                                        <form onSubmit={handleSubmit(onSubmit)}>

                                            <div className="d-flex align-items-center mb-3 pb-1">
                                                <span className="h1 fw-bold mb-0" style={{ color: '#212A3E' }}>KHAT ACADEMIC</span>
                                            </div>
                                            <h5 className="fw-normal mb-3 pb-3" style={{ 'letter-spacing': '1px' }}>Iniciar sesión en su cuenta</h5>
                                            <div className={`form-outline mb-4 ${correoValue ? 'active' : ''}`}>
                                                <input type="email" id="form2Example17" className="form-control form-control-lg" placeholder="Ingrese correo"  {...register('correo', { required: true, pattern: /^\S+@\S+$/i })} />
                                                {errors.correo && errors.correo.type === 'required' && <div className='alert alert-danger'>Ingrese el correo</div>}
                                                {errors.correo && errors.correo.type === 'pattern' && <div className='alert alert-danger'>Ingrese un correo valido</div>}
                                                <label className="form-label" htmlFor="form2Example17">Correo electrónico</label>
                                            </div>

                                            <div className={`form-outline mb-4 ${claveValue ? 'active' : ''}`}>
                                                <input type="password" id="typeText" className="form-control form-control-lg" placeholder="Ingrese clave" {...register('clave', { required: true })} />
                                                {errors.clave && errors.clave.type === 'required' && <div className='alert alert-danger'>Ingrese una clave</div>}
                                                <label className="form-label" htmlFor="typeText">Clave</label>
                                            </div>
                                            <div className="pt-1 mb-4" style={{ textAlign: 'center' }}>
                                                <button className="btn btn-dark btn-lg btn-block" type="submit" style={{ backgroundColor: '#212A3E', width: '100%' }}>INICIAR</button>
                                            </div>


                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;