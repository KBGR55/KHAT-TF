const URLN = "http://localhost:5006/api"
export const URLBASE = "http://localhost:5006"; 
export const InicioSesion = async (data) => {
    const headers = {
        "Accept": 'application/json',
        "Content-Type": 'application/json'
    };
    const datos = await (await fetch(URLN + "/login", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })).json();
    return datos;
}
export const Listar = async (key, urls) => {
    const headers = {
        "Content-Type": "application/json",
        "X-API-TOKEN": key
    };
    const datos = await (await fetch(`${URLN}/${urls}`, {
        method: "GET",
        headers: headers,
    })).json();
    return datos;
}
export const Obtener = async (key, urls) => {
    const headers = {
        "Content-Type": "application/json",
        "X-API-TOKEN": key,
    };
    const datos = await (await fetch(`${URLN}/${urls}`, {
        method: "GET",
        headers: headers,
    })).json();
    return datos;
}
export const obtener = async (id, key, obj) => {
    const headers = {
        "Content-Type": "application/json",
        "X-API-TOKEN": key
    };
    const datos = await (await fetch(`${URLN}/${obj}/obtener/${id}`, {
        method: "GET",
        headers: headers
    })).json();
    return datos;
}
export const Guardar = async (data, key, urls) => {
    const headers = {
        "Content-Type": "application/json",
        "X-API-TOKEN": key
    };
    const datos = await (await fetch(`${URLN}/${urls}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
    })).json();
    return datos;
}
export const GuardarDocumentos = async (data, key) => {
    console.log('llega');
    console.log(data);
    const headers = {
        "x-api-token": key,
    };
    const requestOptions = {
        method: "POST",
        headers: headers,
        body: data, // Envía el FormData directamente como cuerpo
    };
    try {
        const response = await fetch(URLN + '/guardar/practica', requestOptions);

        const datos = await response.json();

        return datos;
    } catch (error) {
        console.log("Error:", error);
        throw error;
    }
}
export const GuardarDocumentosEntrega = async (data, key) => {
    console.log('llega');
    console.log(data);
    const headers = {
        "x-api-token": key,
    };
    const requestOptions = {
        method: "POST",
        headers: headers,
        body: data, // Envía el FormData directamente como cuerpo
    };
    try {
        const response = await fetch(URLN + '/entregar/practica', requestOptions);

        const datos = await response.json();

        return datos;
    } catch (error) {
        console.log("Error:", error);
        throw error;
    }
}
export const GuardarImages = async (data, key, urls) => {
    console.log('llega');
    console.log(data);
    const headers = {
        "x-api-token": key,
    };
    const requestOptions = {
        method: "POST",
        headers: headers,
        body: data, // Envía el FormData directamente como cuerpo
    };
    try {
        const response = await fetch(URLN + urls, requestOptions);

        const datos = await response.json();

        return datos;
    } catch (error) {
        console.log("Error:", error);
        throw error;
    }
}
export const ActualizarImagenes = async (data, key, urls) => {
    console.log('llega');
    console.log(data);
    const headers = {
        "x-api-token": key,
    };
    const requestOptions = {
        method: "PUT",
        headers: headers,
        body: data, // Envía el FormData directamente como cuerpo
    };
    try {
        const response = await fetch(URLN + urls, requestOptions);

        const datos = await response.json();

        return datos;
    } catch (error) {
        console.log("Error:", error);
        throw error;
    }
}
export const Actualizar = async (data, key, urls) => {
    const headers = {
        "Content-Type": "application/json",
        "X-API-TOKEN": key
    };
    const datos = await (await fetch(URLN + "/" + urls, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
    })).json();
    console.log(datos);
    return datos;
}
export const Eliminar = async (data, key, urls) => {
    const headers = {
        "Content-Type": "application/json",
        "X-API-TOKEN": key
    };
    const datos = await (await fetch(URLN + "/" + urls, {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify(data)
    })).json();
    return datos;
}
export const ChanceEstado= async (data, key,urls) => {
    const headers = {
        "Content-Type": "application/json",
        "X-API-TOKEN": key
    };
    const datos = await (await fetch(URLN + "/" + urls, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })).json();
    return datos;
}
export const ObtenerLaboratorio = async (key,data) => {
    var cabecera = {
        "Content-Type": "application/json",
        "X-API-TOKEN": key
    }
    const datos = await (await fetch(URLN+'/peticion/codigo/' + data,  {
        method: "GET",
        headers: cabecera
    })).json();
    return datos;
}