import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Input } from 'react-bootstrap';
import DataTable from "react-data-table-component";
import React, { useState } from 'react';
import { useNavigate } from "react-router";
import Footer from "./Footer";
import SubirActividad from "./SubirActividad";
const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;
const Actividaes = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [data, setData] = useState([]);
    const navegation = useNavigate();
    const [llActivity, setLlActivity] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [selectedId, setSelectedId] = useState(null);
    const handleSearchChange = (event) => { setSearchValue(event.target.value); };

    const columns = [
        {
            name: 'titulo',
            selector: row => row.titulo,
        },
        {
            name: 'Fecha etrega',
            selector: row => row.fechaEntrega,
        },
        {
            name: 'Nota',
            selector: row => row.nota,
        },
        {
            name: 'Retroalimentacion',
            selector: row => row.sugerencias,
        },

    ];

    if (!llActivity) {
        var aux = {
            "titulo": 'Avance Trabajo Final',
            "fechaEntrega": "2023-06-01",
            "sugerencias": 'Mejorar Concluciones',
            "nota": '8'
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
                                <input className="form-control mr-sm-2" type="search" placeholder="Buscar actividad" aria-label="Search" value={searchValue}
                                    onChange={handleSearchChange} />
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{ color:"#212A3E" }}><h2><b>Actividades subidas</b></h2></div>
                    <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
                        <Button variant="primary" onClick={handleShow} style={{ backgroundColor: '#212A3E'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                            <span style={{ marginLeft: '5px' }}>Subir Actividad </span>
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
                <div className="model_box">
                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        style={{ '--bs-modal-width': '75%' }}
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Agregar actividad</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <SubirActividad></SubirActividad>
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

export default Actividaes;