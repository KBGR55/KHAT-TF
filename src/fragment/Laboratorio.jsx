import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/ace';
import { ObtenerLaboratorio } from '../hooks/Conexion';
import { getToken } from '../utilidades/Sessionutil';
import mensajes from '../utilidades/Mensajes';
import '../css/stylesheet.css';
import BarraNavegacion from './BarraNavegacion';

function Laboratorio() {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    function textToHex(text) {
        let hex = '';
        for (let i = 0; i < text.length; i++) {
            const charCode = text.charCodeAt(i).toString(16);
            hex += charCode.length === 1 ? '0' + charCode : charCode;
        }
        return hex;
    }
    const executeCode = async () => {
        try {
            console.log("---------------------------------------------------\nComando escrito: " + code);
            const hexResult = textToHex(code);
            console.log("Comando en tutu: " + hexResult);
            const info = await ObtenerLaboratorio(getToken(), hexResult); // Enviar el código al servidor
            console.log("Peticion recibida: " + info.info + "\n---------------------------------------------------");
            if (info.code !== 200) {
                mensajes(info.msg, 'error', 'Error');
                setOutput('Output is undefined');
            } else {
                setOutput(output + "\n" + info.info);
            }
        } catch (error) {
            console.error('Error al obtener información:', error);
            setOutput('Error al obtener información');
        }
    };
    const clearCode = () => {
        setCode('');
    };
    const handleInputKeyPress = (e) => {
        if (e.key === 'Enter') {
            executeCode();
        }
    };
    return (
        <div id="root"  className=" d-flex justify-content-center align-items-center vh-100">
        <BarraNavegacion></BarraNavegacion>
        <div className="container">
            <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                <div className="row ">
                    <div className="card text-center" style={{ color: "#212A3E", border: 'none', width: '100%' }}>
                        <h2><b>Laboratorio Remoto</b></h2>
                    </div>
                </div>
                <div className="row">
                    <div className="card text-center rounded">
                        <div className="card-body rounded">
                            <div className="modal-body rounded" style={{ backgroundColor: '#272822' }}>
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button className="btn btn-primary" type="button" onClick={executeCode} style={{ backgroundColor: '#272822', color: '#FFFFFF', border: '1px solid #4A4A4A' }}  ><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-caret-right" viewBox="0 0 17 17">
                                        <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
                                    </svg></button>
                                    <button className="btn btn-primary me-md-2" type="button" onClick={clearCode} style={{ backgroundColor: '#272822', color: '#FFFFFF', border: '1px solid #4A4A4A' }}  ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                    </svg></button>
                                </div>
                                <div className={`form-outline ${code ? 'active' : ''}`} style={{ border: '2px solid #4A4A4A' }}>
                                    <input
                                        type="text"
                                        id="typeText"
                                        className="form-control"
                                        value={code}
                                        onChange={e => setCode(e.target.value)}
                                        onKeyDown={handleInputKeyPress}
                                        style={{ backgroundColor: '#272822', color: '#FFFFFF', border: 'none' }}
                                    />
                                    <label className="form-label" htmlFor="typeText" style={{ color: '#4A4A4A', backgroundColor: '#272822' }}>Escribir comando....</label>
                                </div>
                                <AceEditor
                                    mode="text"
                                    theme="monokai"
                                    name="output-editor"
                                    editorProps={{ $blockScrolling: Infinity }}
                                    value={output}
                                    readOnly={true}
                                    style={{ width: '100%', height: '45vh', background: '#272822', color: '#FFFFFF',borderBottomLeftRadius: '8px', // No redondear esquina inferior izquierda
                                    borderBottomRightRadius: '8px' // No redondear esquina inferior derecha
                                 }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>   
    );
}

export default Laboratorio;
