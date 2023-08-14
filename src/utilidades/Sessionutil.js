export const saveToken = (token) => {
    localStorage.setItem("token", token);
}
 
export const getToken = () => {
    return localStorage.getItem('token');
}

export const borrarSesion=()=>{
    localStorage.clear();
}

export const estaSesion =()=>{
    var token = localStorage.getItem('token');
    return (token && (token != 'undefined' || token!=null || token!='null'));
}

export const saveRol = (rol) => {
    localStorage.setItem('rol', rol);
}

export const getRol = () => {
    return localStorage.getItem('rol');
}
// Guardar usuario en el almacenamiento local
export const saveUser = (user) => {
    const userJSON = JSON.stringify(user);
    localStorage.setItem('user', userJSON);
}

// Obtener usuario desde el almacenamiento local
export const getUser = () => {
    const userJSON = localStorage.getItem('user');
    return JSON.parse(userJSON);
}