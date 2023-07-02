import './App.css';
import Login from './fragment/Login';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import PresentarEstudiantes from './fragment/PresentarEstudiantes';
import Actividaes from './fragment/Actividades';
import AsignarActividad from './fragment/AsignarActividad';
import PaginaPrincipal from './fragment/PaginaPrincipal ';
import PaginaPincipalAdmin from './fragment/PaginaPincipalAdmin';
import ListarPersonas from './fragment/ListarPersonas';
import Actualizar from './fragment/Actualizar';
import EditarPersona from './fragment/EditarPersona';
import CambiarEstado from './fragment/CambiarEstado';
import ListarMatriculas from './fragment/ListarMatriculas';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/inicio' element={<PaginaPrincipal />} />
      <Route path='/inicio/listarActividades' element={<Actividaes />} />
      <Route path='/paginaPrincipal' element={<PaginaPincipalAdmin/>} />
      <Route path='/paginaPrincipal/listarAlumnos' element={<PresentarEstudiantes />} />     
      <Route path='/paginaPrincipal/asignarActividades' element={<AsignarActividad />} />

      
      <Route path='/paginaPrincipal/listarregistros' element={<ListarPersonas />} />
      <Route path='/registros/edicion' element={<EditarPersona/>}/>
      <Route path='/registros/cambioestado' element={<CambiarEstado/>}/>
      <Route path='/registros/listamatriculas' element={<ListarMatriculas/>}/>
      <Route path='/act' element={<Actualizar />} /> 

    </Routes>
  );
}

export default App;
