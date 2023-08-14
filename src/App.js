import './App.css';

import { Navigate, Route, Routes} from 'react-router-dom';
import ListarPersonas from './fragment/ListarPersonas';
import { estaSesion, getRol } from './utilidades/Sessionutil';
import Login from './fragment/Login';
import PaginaPrincipal from './fragment/PaginaPrincipal ';
import ActualizarVentanaPersonas from './fragment/ActualizarVentanaPersonas';
import Laboratorio from './fragment/Laboratorio';
import AsignarDocente from './fragment/AsignarDocente';
import AsignarMatricula from './fragment/AsignarMatricula';
import ListaParticipantes from './fragment/ListaParticipantes';
import ListaPracticas from './fragment/ListaPracticas';
import ListarEntregas from './fragment/ListarEntregas';
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
    if (rol === "ADMINISTRADOR") {
      return children
    }else{
      return <Navigate to= "/"/>
    }
  }

  return (
    <Routes>
     <Route path='/' element={<Login/>} />
     <Route path='/inicio' element={<MiddewareSesion><PaginaPrincipal /></MiddewareSesion>} />
      <Route path='/act' element={<ActualizarVentanaPersonas/>} /> 
      <Route path ='/admin/usuarios' element= {<MiddewareRol><MiddewareSesion><ListarPersonas/></MiddewareSesion></MiddewareRol>} />
      <Route path='/estudiantes/laboratorio'element={<Laboratorio/>} />
      <Route path='/estudiantes/practica/:id'element={<ListaPracticas/>} />
      <Route path='/admin/docentes'element={<AsignarDocente/>} />
      <Route path='/admin/matricular'element={<AsignarMatricula/>} />
      <Route path="/docente/participantes/:id"element={<ListaParticipantes/>} />
      <Route path="/docente/participantes/entrega/:id"element={<ListarEntregas/>} />
    </Routes>
  );
}

export default App;