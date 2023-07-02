import React from 'react';
import Footer from './Footer';

const PaginaPincipalAdmin = () => {
    return (
        <div className="wrapper">
            <div className="d-flex flex-column">
                <div className="content">
                    {/* Header */}
                    <header >
                        <nav class="navbar navbar-expand-lg " style={{ backgroundColor: '#212A3E' }}>
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse " id="navbarTogglerDemo01" style={{ width: '100%' }}>
                                <a class="navbar-brand" style={{ color: '#F1F6F9' }}>Area personal</a>
                                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                                    <li class="nav-item active">
                                        <a class="nav-link" href="/paginaPrincipal/asignarActividades" target='_blank' style={{ color: '#F1F6F9' }}>Asignar Actividades</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/paginaPrincipal/listarAlumnos" target='_blank' style={{ color: '#F1F6F9' }}>Alumnos</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/paginaPrincipal/listarregistros" style={{ color: '#F1F6F9' }}>Registrar</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/registros/listamatriculas" style={{ color: '#F1F6F9' }}>Lista Matriculas</a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </header>

                    <div className="container" >
                        <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                            <div className="row ">
                                {/* Section */}
                                <div className='content-fluid'>
                                    <h1 className="h3 mb-0 text-gray-800">Cursos impartidos</h1>
                                    <div className="row">
                                        <div className="col-xl-3 col-md-6 mb-4">
                                            <div className="card border-left-primary shadow h-100 py-2">
                                                <div className="card-body">
                                                    <div className="row no-gutters align-items-center">
                                                        <div className="col mr-2">
                                                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Estructura de Datos</div>
                                                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                            </div>
                                                        </div>
                                                        <div className="col-auto">
                                                            <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-3 col-md-6 mb-4">
                                            <div className="card border-left-primary shadow h-100 py-2">
                                                <div className="card-body">
                                                    <div className="row no-gutters align-items-center">
                                                        <div className="col mr-2">
                                                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1" >Desarrollo Basado en Plataformas</div>
                                                            <div className="h5 mb-0 font-weight-bold text-gray-800">

                                                            </div>
                                                        </div>
                                                        <div className="col-auto">
                                                            <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Footer */}
                    <div style={{ display: 'flex', 'flex-direction': 'column', 'min-height': '100vh' }}>
                        <Footer />
                    </div>

                </div>
            </div>
        </div>);
}

export default PaginaPincipalAdmin;