const URLN = "http://localhost:3006/api"
export const InicioSesion = async (data) => {
    const cabeceras = {
        "Accept": 'aplication/json',
        "Content-Type": 'application/json'
    };
    const datos = await (await fetch(URLN + "/sesion", {
        method: "POST",
        headers: cabeceras,
        body: JSON.stringify(data)
    })).json();
    return datos;
}

//-----LISTAR
export const Roles = async (key) => {
    const cabeceras = { "X-API-TOKEN": key };
    const datos = await (await fetch(URLN + "/roles", {
        method: "GET",
        headers: cabeceras
    })).json();
    return datos;
}

export const Periodo = async (key) => {
    const cabeceras = { "X-API-TOKEN": key };
    const datos = await (await fetch(URLN + "/periodo/listar", {
        method: "GET",
        headers: cabeceras
    })).json();
    return datos;
}

export const Matricula = async (key) => {
    const cabeceras = { "X-API-TOKEN": key };
    const datos = await (await fetch(URLN + "/matriculas/listar", {
        method: "GET",
        headers: cabeceras
    })).json();
    console.log("datos", datos);
    return datos;
}

export const Personas = async (key) => {
    const cabeceras = {
        "X-API-TOKEN": key
    };
    const datos = await (await fetch(URLN + "/personas", {
        method: "GET",
        headers: cabeceras
    })).json();
    return datos;
}

export const ListadoRegistros = async (key) => {
    const cabeceras = {
        "X-API-TOKEN": key
    };
    const datos = await (await fetch(URLN + "/listadoregistro", {
        method: "GET",
        headers: cabeceras
    })).json();
    console.log("DATOS QUE VIENEN", datos);
    return datos;
}

//-----GUARDAR

export const GuardarPersona = async (data, key) => {
    const headers = {
        "Content-Type": "application/json",
        "X-API-TOKEN": key
    };
    const datos = await (await fetch(URLN + "/personas/guardar", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })).json();
    console.log("DATOS A GUARDAR", datos);
    return datos;
}

export const GuardarPeriodo = async (data, key) => {
    const headers = {
        "Content-Type": "application/json",
        "X-API-TOKEN": key
    };
    const datos = await (await fetch(URLN + "/periodo/guardar", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })).json();
    return datos;
}

export const GuardarMatricula = async (data, key) => {
    const headers = {
        "Content-Type": "application/json",
        "X-API-TOKEN": key
    };
    const datos = await (await fetch(URLN + "/matriculas/guardar", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })).json();
    console.log("DATOS QUE MANDA", datos);
    return datos;
}

//-------ACTUALIZAR
export const ActualizarPersona = async (data, key) => {
    const headers = {
        "Content-Type": "application/json",
        "X-API-TOKEN": key
    };
    const datos = await (await fetch(URLN + "/personas/modificar", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })).json();
    return datos;
}

export const ChanceEstado = async (data, key) => {
    const headers = {
        "Content-Type": "application/json",
        "X-API-TOKEN": key
    };
    const datos = await (await fetch(URLN + "/personas/cambiarEstado", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })).json();
    return datos;
}

export const ActualizarPeriodo = async (data, key) => {
    const headers = {
        "Content-Type": "application/json",
        "X-API-TOKEN": key
    };
    const datos = await (await fetch(URLN + "/periodo/modificar", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })).json();
    return datos;
}

export const ActualizarMatricula = async (data, key) => {
    const headers = {
        "Content-Type": "application/json",
        "X-API-TOKEN": key
    };
    const datos = await (await fetch(URLN + "/matriculas/modificar", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })).json();
    return datos;
}

//------OBTENER UN DATO

export const ObtenerPersona = async (id, key) => {
    console.log("aqui");
    var cabeceras = { "X-API-TOKEN": key };
    const datos = await (await fetch(`${URLN}/personas/obtener/${id}`, {
        method: "GET",
        headers: cabeceras
    })).json();
    console.log("TRAE", datos);
    return datos;
}


export const ObtenerPeriodo = async (id, key) => {
    var cabeceras = { "X-API-TOKEN": key };
    const datos = await (await fetch(`${URLN}/periodo/obtener/${id}`, {
        method: "GET",
        headers: cabeceras
    })).json();
    return datos;
}

export const ObtenerMatricula = async (id, key) => {
    var cabeceras = { "X-API-TOKEN": key };
    const datos = await (await fetch(`${URLN}/matriculas/obtener/${id}`, {
        method: "GET",
        headers: cabeceras
    })).json();
    return datos;
}




