import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Input } from 'react-bootstrap';
import DataTable from "react-data-table-component";
import React, { useState } from 'react';
import { useNavigate } from "react-router";
import Footer from "./Footer";
import RegistrarEstudiantes from "./RegistrarEstudiantes";

const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

export const PresentarEstudiantes = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [data, setData] = useState([]);
    const navegation = useNavigate();
    const [llActivity, setLlActivity] = useState(false);
    const [searchValue, setSearchValue] = useState('');//PARA LA BUSQUEDA POR ID
    const [selectedId, setSelectedId] = useState(null);//PARA SACAR EL ID DE LA TABLA
    const handleSearchChange = (event) => {setSearchValue(event.target.value);};//PARA LA BUSQUEDA POR ID
   
    //COLUMNAS DE LA TABLA
    const columns = [
        {
            name: 'Nombres',
            selector: row => row.nombres,
        },
        {
            name: 'Apellidos',
            selector: row => row.apellidos,
        },
        {
            name: 'Género',
            selector: row => row.genero,
        },
        {
            name: 'Fecha de nacimiento',
            selector: row => row.fechanacimiento,
        },
        {
            name: 'Ciclo',
            selector: row => row.ciclo,
        },
        {
            name: 'Número de teléfono',
            selector: row => row.ntelefono,
        },
        {
            name: 'Correo',
            selector: row => row.correo,
        },
    
    ];

    if (!llActivity) {
        var aux={
            "nombres":'Karen Brigith',
            "apellidos": "Gonzaga Rivas",
            "ntelefono": '0967494871',
            "correo": "karen.b.gonzaga@unl.edu.ec",
            "ciclo": 'Ciclo 5',
            "fechanacimiento": '2003-12-05',
            "genero": 'Femenino'
        }
        setData([aux]);
        setLlActivity(true);
    }

    return (

        <div className="container">
            <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                <div className="row ">

                    <div className="col-sm-3 mt-5 mb-4 text-gred">
                        <div className="search">
                            <form className="form-inline">
                                <input className="form-control mr-sm-2" type="search" placeholder="Buscar estudiante" aria-label="Search" value={searchValue}
                                    onChange={handleSearchChange} />
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{ color:"#212A3E" }}><h2><b>Lista Alumnos</b></h2></div>
                    <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred" >
                        <Button variant="primary" style={{ backgroundColor: "#212A3E" }} onClick={handleShow}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                            <span style={{ marginLeft: '5px' }}>Agregar Alumno </span>
                        </Button>
                    </div>
                </div>
                <div className="row">
                    <DataTable
                        columns={columns}
                        data={data}
                    />
                </div>
                
                    <Footer></Footer>
              
                {/* <!--- Model Box ---> */}
                <div  className="model_box">
                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        style={{'--bs-modal-width': '75%'}}
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Agregar estudiante</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <RegistrarEstudiantes/>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cerrar
                            </Button>

                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default PresentarEstudiantes;