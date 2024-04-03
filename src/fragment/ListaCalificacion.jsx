import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Obtener, URLBASE } from '../hooks/Conexion';
import mensajes from '../utilidades/Mensajes';
import { borrarSesion, getToken} from '../utilidades/Sessionutil';
import 'mdb-ui-kit/css/mdb.min.css';
import Button from 'react-bootstrap/Button'

const ListaCalificacion = ({ parametro }) => {
  const [llasignaturas, setLlasignaturas] = useState(false);//para listar asignaturas
  const [personaObtenida, setPersonaObtenida] = useState([]);//para estudiante datos tabla
  if (!llasignaturas) {
    //PERIODO
    Obtener(getToken(), `obtener/entrega/practica/${parametro}`).then((info) => {
      if (info.error === true || info.msg === 'Token no valido o expirado!') {
        borrarSesion();
        mensajes(info.msg);
      } else {
        setPersonaObtenida(info.info);
      }
      if (info.code !== 200) {
        mensajes(info.msg);
      }
    });
    setLlasignaturas(true);
  }
  console.log(personaObtenida);

  useEffect(() => {
    setLlasignaturas(false);
  }, []);

  return (
    <div className="container">
    <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="table-responsive">
          <table className="table table-striped">
              <thead className="table-dark">
                <tr>
                  <th className="text-center" style={{ backgroundColor: "#394867", color: "#F1F6F9", border: "none", fontWeight: 'bold' }}>Fecha_entrega </th>
                  <th className="text-center" style={{ backgroundColor: "#394867", color: "#F1F6F9", border: "none", fontWeight: 'bold' }}>Comentario</th>
                  <th className="text-center" style={{ backgroundColor: "#394867", color: "#F1F6F9", border: "none", fontWeight: 'bold' }}>Estado</th>
                  <th className="text-center" style={{ backgroundColor: "#394867", color: "#F1F6F9", border: "none", fontWeight: 'bold' }}>Archivo</th>
                  <th className="text-center" style={{ backgroundColor: "#394867", color: "#F1F6F9", border: "none", fontWeight: 'bold' }}>Nota</th>
                </tr>
              </thead>
              <tbody>
                {personaObtenida.map((estudiante) => (
                  <tr key={estudiante.id}>
                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{new Date(estudiante.fecha_entrega).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{estudiante.comentario}</td>
                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{estudiante.estado ? 'SIN CALIFICAR' : 'CALIFICADO'}</td>
                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>
                      <a href={`${URLBASE}/archivos/entregas/${estudiante.enlace_archivo_entrega}`} target="_blank" rel="noopener noreferrer">
                        <Button
                          variant="btn btn-outline btn-rounded"
                          // onClick={handleShow}
                          style={{
                            backgroundColor: '#9BA4B5',
                            borderColor: '#9BA4B5',
                            color: '#FFFFFF'
                          }}>

                          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-filetype-pdf" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z" />
                          </svg>
                        </Button>
                      </a>
                    </td>
                    <td className="text-center" style={{ backgroundColor: "#FFFFFF", border: "none" }}>{estudiante.nota}</td>
                  </tr>
                ))}
              </tbody>
            </table></div>
        </div>
      </div>
    </div >
  );
}

export default ListaCalificacion;