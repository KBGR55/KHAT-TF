import './App.css';
import Login from './fragment/Login';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import PresentarEstudiantes from './fragment/PresentarEstudiantes';
import Actividaes from './fragment/Actividades';
import AsignarActividad from './fragment/AsignarActividad';
import Laboratorio from './fragment/Laboratorio';
import PaginaPrincipal from './fragment/PaginaPrincipal ';
import PaginaPincipalAdmin from './fragment/PaginaPincipalAdmin';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/inicio' element={<PaginaPrincipal />} />
      <Route path='/inicio/listarActividades' element={<Actividaes />} />
      <Route path='/inicio/laboratorio' element={<Laboratorio />} />
      <Route path='/paginaPincipal' element={<PaginaPincipalAdmin/>} />
      <Route path='/paginaPincipal/listarAlumnos' element={<PresentarEstudiantes />} />
      <Route path='/paginaPincipal/asignarActividades' element={<AsignarActividad />} />
    </Routes>
  );
}

export default App;
