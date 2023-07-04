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
import { DadosBaja, ListadoRegistros, ObtenerPersona, Personas } from "../hooks/Conexion";
import { Link, unstable_HistoryRouter } from "react-router-dom";
import GenerarMatricula from "./GenerarMatricula";

export const ListarDadosBaja = () => {

    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);
    const navegation = useNavigate();
    const [llPersonas, setLlṔersonas] = useState(false);
    const [personaObtenida, setpersonaObtenida] = useState([]);
    const [searchValue, setSearchValue] = useState(''); // PARA LA BUSQUEDA POR ID
    const handleSearchChange = (event) => { setSearchValue(event.target.value); }; // PARA LA BUSQUEDA POR ID


    if (!llPersonas) {
        DadosBaja(getToken()).then((info) => {
            if (info.code !== 200 && info.msg == 'Acceso denegado. Token a expirado') {
                borrarSesion();
                mensajes(info.mensajes);
                navegation("/sesion")
            } else {
                setData(info.info);
                setLlṔersonas(true);
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
            <div className="row">
                <div className="col-sm-6 mt-5 mb-4 text-gred">
                    <h2 style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Listado de Estudiantes Dados de Baja</h2>
                </div>
                <div className="col-sm-6 mt-5 mb-4 text-gred d-flex justify-content-end">

                </div>
            </div>
            <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded" style={{ display: 'flex', justifyContent: 'flex-end' }}>

                <div className="col">
                    <table className="table table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Nombres</th>
                                <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Apellidos</th>
                                <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Identificación</th>
                                <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Tipo de identificación</th>
                                <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Fecha Nacimiento</th>
                                <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Número de teléfono</th>
                                <th className="text-center" style={{ backgroundColor: "#212A3E", color: "#FFFFFF", border: "none" }}>Direccion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((estudiante) => (
                                <tr key={estudiante.id}>
                                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{estudiante.nombres}</td>
                                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{estudiante.apellidos}</td>
                                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{estudiante.identificacion}</td>
                                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{estudiante.tipo_identificacion}</td>
                                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{obtenerFechaFormateada(estudiante.fecha_nacimiento)}</td>
                                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{estudiante.telefono}</td>
                                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{estudiante.direccion}</td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div >
    );
}

export default ListarDadosBaja;
