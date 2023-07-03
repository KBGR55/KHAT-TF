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