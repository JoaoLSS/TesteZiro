import React, { useState, useReducer, useCallback } from "react";
import ReactDOM from "react-dom";
import { Container, Col, Row, Button } from 'react-bootstrap';

import { Login, UploadPhoto } from '../presentational';

const MainContainer = () => {

    const [requestData, setRequestData] = useState({});
    const [responseData, setResponseData] = useState();
    const [token, setToken] = useState(null);

    const [page, setPage] = useState('uploadPhoto');

    return (
        <Container fluid={true} style={{ padding: 100 }}>
            <Row>
            <Col>
                {
                    token ?
                    [<Row style={{ justifyContent: 'space-evenly' }}>
                        <Button variant='primary' onClick={() => setPage('uploadPhoto')}>
                            Upload foto
                        </Button>
                        <Button variant='primary' onClick={() => setPage('fullOCR')}>
                            FullOCR
                        </Button>
                        <Button variant='primary' onClick={() => setPage('compRes')}>
                            Comprovante Residencia
                        </Button>
                        <Button variant='primary' onClick={() => setPage('bio')}>
                            Biometria
                        </Button>
                    </Row>,
                    <Row>
                        {
                            (() => {
                                switch(page) {
                                    case 'uploadPhoto': return <UploadPhoto setRequestData={setRequestData} requestData={requestData}/>
                                    default: return null
                                }
                            })()
                        }
                    </Row>]
                    :
                    <Login setRequestData={setRequestData} setResponseData={setResponseData} setToken={setToken} requestData={requestData}/>
                }
            </Col>
            <Col>
                <Row>
                    <h1>A enviar</h1>
                </Row>
                <div style={{ whiteSpace: 'pre' }}>
                    {JSON.stringify(requestData,null,4)}
                </div>
                <Row>
                    <h1>Resposta</h1>
                </Row>
                <div style={{ whiteSpace: 'pre' }}>
                    {JSON.stringify(responseData,null,4)}
                </div>
            </Col>
            </Row>
        </Container>
    )
};

export default MainContainer;

const wrapper = document.getElementById("reactWrapper");
wrapper && ReactDOM.render(<MainContainer />, wrapper);