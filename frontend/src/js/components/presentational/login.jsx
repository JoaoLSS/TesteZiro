import React, { useState, useReducer, useCallback, useRef } from "react";
import ReactDOM from "react-dom";
import { Form, Button } from "react-bootstrap";

const Login = ({ setRequestData, setResponseData, setToken, requestData }) => {

    const emailRef = useRef();
    const passwordRef = useRef();

    const handleChange = useCallback(() => setRequestData({ email: emailRef.current.value, password: passwordRef.current.value }));

    const handleSubmit = useCallback((event) => {
        fetch('https://auth.nxcd.com.br/v1.0/login/', {
            method: 'POST',
            body: JSON.stringify(requestData),
            headers: {
                contentType: 'application/x-www-form-urlencoded',
                dataType: 'json'
            }
        })
        .then(({ text }) => text())
        .then(setResponseData)
        .catch(setResponseData)
        event.preventDefault();
    })

    return (
        <Form style={{ padding: 20 }} onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control ref={emailRef} type='email' placeholder='Email' onChange={handleChange}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Senha</Form.Label>
                <Form.Control ref={passwordRef} type='password' placeholder='Senha' onChange={handleChange}/>
            </Form.Group>
            <Button variant='primary' type='submit'>
                Entrar
            </Button>
        </Form>
    )
}

export default Login;