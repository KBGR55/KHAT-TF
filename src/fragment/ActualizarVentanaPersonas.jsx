import {useEffect } from 'react';
import { useNavigate } from 'react-router';


function ActualizarVentanaPersonas() {
  const navegation = useNavigate();
  useEffect(() => {
    navegation("/inicio");
  }, [navegation]);  
}
export default ActualizarVentanaPersonas;