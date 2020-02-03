import React, { useState, useReducer, useCallback } from "react";
import ReactDOM from "react-dom";
import { Container, Col, Row } from 'react-bootstrap';

import { Login } from '../presentational';

const MainContainer = () => {

    const [requestData, setRequestData] = useState({});
    const [responseData, setResponseData] = useState();
    const [token, setToken] = useState(null);

    return (
        <Container style={{ padding: 100 }}>
            <Row>
            <Col>
                <Login setRequestData={setRequestData} setResponseData={setResponseData} setToken={setToken} requestData={requestData}/>
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