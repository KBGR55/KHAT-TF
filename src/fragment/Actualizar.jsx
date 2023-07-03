import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';


function Actualizar() {
  const navegation = useNavigate();
  useEffect(() => {
    navegation("/paginaPrincipal/listarregistros");
  }, []);
}
export default Actualizar;