import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Asignatura } from '../hooks/Conexion';
import { getToken } from '../utilidades/Sessionutil';

const Asignaturas = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [asignatura, setAsignatura] = useState(null);

  useEffect(() => {
    const obtenerAsignatura = async () => {
      const datos = await Asignatura(getToken());
      const selectedAsignatura = datos.info.find(asignatura => asignatura.external_id === id);
      setAsignatura(selectedAsignatura);
    };

    obtenerAsignatura();
  }, [id]);

  if (!asignatura) {
    return <div>Cargando...</div>;
  }

  const handleVolver = () => {
    navigate('/inicio');
  };

  const handlePracticas = () => {
    // Lógica para manejar el clic en el botón "Practicas"
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '50px' }}>
      <div style={{ width: '80%', maxWidth: '800px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Detalles de la asignatura</h1>
        <div style={{ backgroundColor: '#F0F0F0', border: '1px solid #CCC', borderRadius: '5px', padding: '20px' }}>
          <table style={{ width: '100%' }}>
            <thead>
              <tr style={{ backgroundColor: '#E0E0E0' }}>
                <th>Nombre</th>
                <th>Número de ciclo</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{asignatura.nombre}</td>
                <td>{asignatura.ciclo.numero_ciclo}</td>
                <td>{asignatura.estado ? 'Disponible' : 'No disponible'}</td>
                <td>
                  <button
                    style={{
                      backgroundColor: '#212A3E',
                      color: '#FFF',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '3px',
                    }}
                    onClick={handlePracticas}
                  >
                    Practicas
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <h3>Regresar</h3>
          <button
            style={{
              backgroundColor: '#212A3E',
              color: '#FFF',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer',
            }}
            onClick={handleVolver}
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default Asignaturas;
