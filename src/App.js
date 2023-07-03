import './App.css';
import Login from './fragment/Login';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { estaSesion, getRol, getToken } from './utilidades/Sessionutil';
import PresentarEstudiantes from './fragment/PresentarEstudiantes';
import Actividades from './fragment/Actividades';
import AsignarActividad from './fragment/AsignarActividad';
import Laboratorio from './fragment/Laboratorio';
import PaginaPrincipal from './fragment/PaginaPrincipal ';
import PaginaPrincipalAdmin from './fragment/PaginaPrincipalAdmin';

function App() {

  const MiddewareSesion = ({ children }) => {
    const autenticado = estaSesion();

    if (autenticado) {
      return children
    } else {

      return <Navigate to='/' />;

    }
  }

  const MiddewareRol = ({ children}) => {
    const rol = getRol();
    if (rol === "elfucking_admin") {
      return children
    }else{
      return <Navigate to= "/"/>
    }
  }
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/inicio' element={<MiddewareSesion><PaginaPrincipal /></MiddewareSesion>} />
      <Route path='/inicio/listarActividades' element={<MiddewareSesion><Actividades /></MiddewareSesion>} />
      <Route path='/inicio/laboratorio' element={<MiddewareSesion><Laboratorio /></MiddewareSesion>} />

      <Route path='/paginaPrincipal' element={<MiddewareRol><MiddewareSesion><PaginaPrincipalAdmin /></MiddewareSesion></MiddewareRol>} />
      <Route path='/paginaPincipal/listarAlumnos' element={<MiddewareRol><MiddewareSesion><PresentarEstudiantes /></MiddewareSesion></MiddewareRol>} />
      <Route path='/paginaPincipal/asignarActividades' element={<MiddewareRol><MiddewareSesion><AsignarActividad /></MiddewareSesion></MiddewareRol>} />
    </Routes>
  );
}

export default App;
