import React, { useState } from 'react';
import AceEditor from 'react-ace';


// Importa el archivo JavaScript del CDN de Ace Editor


import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/ace';

function Laboratorio() {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');

    const executeCode = () => {
        try {
            const result = eval(code);
            if (result !== undefined) {
                setOutput(result.toString());
            } else {
                setOutput('Output is undefined');
            }
        } catch (error) {
            console.error('Error al ejecutar el código:', error);
            setOutput(`Error: ${error.message}`);
        }
    };


    return (
        <div className="container">
            <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                <div className="row " >

                    <div className="card text-center" style={{ color: "#212A3E", border: 'none', width: '100%' }}><h2><b>Laboratorio Remoto</b></h2></div>
                </div>
                <div className="row" style={{ height: '55px' }}>
                    <div className="text-center" >
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-secondary">Switch</button>
                            <button type="button" class="btn btn-secondary">Route</button>
                            <button type="button" class="btn btn-secondary">SP32</button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="card text-center">
                        <div className="card-header">
                            <ul className="nav nav-pills card-header-pills">
                                <li className="nav-item">
                                    <button style={{ backgroundColor: '#212A3E', width: '100%' }} className="btn btn-success btn-rounded" onClick={executeCode}>RUN</button>
                                </li>
                            </ul>
                        </div>
                        <div className="card-body">
                            <div class="modal-body" style={{ backgroundColor: '#272822' }}>
                                <AceEditor
                                    mode="javascript"
                                    theme="monokai"
                                    name="code-editor"
                                    editorProps={{ $blockScrolling: Infinity }}
                                    value={code}
                                    onChange={setCode}
                                    style={{ width: '100%', height: '200px', marginTop: '10px' }}
                                />
                                <textarea
                                    value={output}
                                    onChange={() => { }}
                                    placeholder="Resultado"
                                    style={{ width: '100%', height: '200px', marginTop: '10px', background: '#272822', color: '#FFFFFF' }}
                                />
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
};



export default Laboratorio;