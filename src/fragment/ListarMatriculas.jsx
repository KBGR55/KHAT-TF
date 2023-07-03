import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from 'react-bootstrap';
import mensajes from '../utilidades/Mensajes';
import { borrarSesion, getToken } from '../utilidades/Sessionutil';
import React, { useState } from 'react';
import { useNavigate } from "react-router";
import Footer from "./Footer";
import EditarPersona from "./EditarPersona";
import CambiarEstado from "./CambiarEstado";
import RegistrarEstudiantes from "./RegistrarEstudiantes";
import { ListadoRegistros, Matricula, ObtenerPersona, Personas } from "../hooks/Conexion";
import { Link, unstable_HistoryRouter } from "react-router-dom";
import GenerarMatricula from "./GenerarMatricula";

export const ListarMatriculas = () => {

    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);
    const navegation = useNavigate();
    const [llMatricula, setLlMatricula] = useState(false);
    const [searchValue, setSearchValue] = useState(''); // PARA LA BUSQUEDA POR ID

    if (!llMatricula) {
        Matricula(getToken()).then((info) => {
            if (info.code !== 200 && info.msg == 'Acceso denegado. Token a expirado') {
                borrarSesion();
                mensajes(info.mensajes);
                navegation("/sesion")
            } else {
                setData(info.info);
                setLlMatricula(true);
            }
        })
    }

    //CAMBIAR FORMATO FECHA

    const obtenerFechaFormateada = (fechaString) => {
        const fecha = new Date(fechaString);
        fecha.setDate(fecha.getDate() + 1); // Ajustar la fecha sumando 1 día
        const year = fecha.getFullYear();
        const month = ('0' + (fecha.getMonth() + 1)).slice(-2);
        const day = ('0' + fecha.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };

    return (
        <div className="container">

            <div className="col-sm-6 mt-5 mb-4 text-gred d-flex justify-content-end">

            </div>
            <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                <div className="row ">
                    <div className="col-sm-6 mt-5 mb-4 text-gred" style={{ color: "#212A3E" }}>
                        <h2 style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Listado de estudiantes matriculados</h2>
                    </div>
                    <div className="col-sm-6 mt-5 mb-4 text-gred d-flex justify-content-end">
                        <Link to="/paginaPrincipal" className="btn btn-secondary">
                            Volver a la página principal
                        </Link>
                    </div>


                </div>
                <div className="col">
                    <table className="table table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Numero</th>
                                <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Fecha registro</th>
                                <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Estudiante</th>
                                <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Nombres</th>
                                <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Apellidos</th>
                                <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Mes comienzo</th>
                                <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Mes culminacion</th>
                                <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Año</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((estudiante) => (
                                <tr key={estudiante.id}>
                                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{estudiante.numero}</td>
                                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{obtenerFechaFormateada(estudiante.fecha_registro)}</td>
                                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{estudiante.persona.identificacion}</td>
                                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{estudiante.persona.nombres}</td>
                                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{estudiante.persona.apellidos}</td>
                                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{estudiante.periodo.mes_comienzo}</td>
                                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{estudiante.periodo.mes_culminacion}</td>
                                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{estudiante.periodo.anio_periodo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Footer />
            </div>
        </div>
        
    );
}

export default ListarMatriculas;
