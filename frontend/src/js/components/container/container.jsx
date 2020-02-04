import React, { useState, useReducer, useCallback } from "react";
import ReactDOM from "react-dom";
import { Container, Col, Row, Button } from 'react-bootstrap';

import { Login, UploadPhoto, FullOCR, CompRes, Biometria, BiometriaDatavalid } from '../presentational';

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
                        <Button variant='primary' onClick={() => setPage('bioData')}>
                            Biometria Datavalid
                        </Button>
                    </Row>,
                    <Row>
                        {
                            (() => {
                                switch(page) {
                                    case 'uploadPhoto': return <UploadPhoto setRequestData={setRequestData} requestData={requestData} token={token} setResponseData={setResponseData}/>
                                    case 'fullOCR': return <FullOCR setRequestData={setRequestData} setResponseData={setResponseData} requestData={requestData} token={token}/>
                                    case 'compRes': return <CompRes setRequestData={setRequestData} setResponseData={setResponseData} requestData={requestData} token={token}/>
                                    case 'bio': return <Biometria setRequestData={setRequestData} setResponseData={setResponseData} requestData={requestData} token={token}/>
                                    case 'bioData': return <BiometriaDatavalid setRequestData={setRequestData} setResponseData={setResponseData} requestData={requestData} token={token}/>
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
                    <h3>A enviar</h3>
                </Row>
                <div style={{ whiteSpace: 'pre' }}>
                    {JSON.stringify(requestData,null,4)}
                </div>
                <Row>
                    <h3>Resposta</h3>
                </Row>
                <div style={{ whiteSpace: 'pre', width: 500 }}>
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