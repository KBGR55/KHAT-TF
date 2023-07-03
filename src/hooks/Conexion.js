const URL = "http://localhost:3006/api"

export const InicioSesion = async (data) => {

    const headers = {
        "Accept": 'application/json',
        "Content-Type": 'application/json'
    };

    const datos = await (await fetch(URL + "/login", {
        
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)

    })).json();

    return datos;
}

export const listar = async (key, obj) => {
    const headers = {
        "Content-Type": "application/json",
        "X-API-KEY": key
    };
    const datos = await (await fetch(URL + "/"+obj+"/listar", {
        method: "GET",
        headers: headers
    })).json();
    console.log(datos);
    return datos;
}

export const obtener = async (data, key, obj) => {
    const headers = {
        "Content-Type": "application/json",
        "X-API-KEY": key
    };
    const datos = await (await fetch(URL + "/"+obj+"/obtener", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })).json();
    console.log(datos);
    return datos;
}

export const guardar = async(data, key, obj) => {
    const headers = {
        "Content-Type": "application/json",
        "X-API-KEY": key
    };
    const datos = await (await fetch(URL + "/"+obj+"/guardar", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })).json();
    console.log(datos);
    return datos;
}

export const actualizar = async (data, key, obj) => {
    const headers = {
        "Content-Type": "application/json",
        "X-API-KEY": key
    };
    const datos = await (await fetch(URL + "/"+obj+"/actualizar", {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data)
    })).json();
    console.log(datos);
    return datos;
};

export const eliminar = async(data, key, obj) => {
    const headers = {
        "Content-Type": "application/json",
        "X-API-KEY": key
    };
    const datos = await (await fetch(URL + "/"+obj+"/borrar", {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify(data)
    })).json();
    console.log(datos);
    return datos;
}
