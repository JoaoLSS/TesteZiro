import React, { useState, useReducer, useCallback, useRef } from "react";
import ReactDOM from "react-dom";
import { Form, Button } from "react-bootstrap";
import Axios from "axios";

const Login = ({ setRequestData, setResponseData, setToken, requestData }) => {

    const emailRef = useRef();
    const passwordRef = useRef();

    const handleChange = useCallback(() => setRequestData({ email: emailRef.current.value, password: passwordRef.current.value }),[setRequestData]);

    const handleSubmit = useCallback((event) => {
        setResponseData('carregando')
        Axios.post('https://auth.nxcd.com.br/v1.0/login/',requestData, {
            headers: {
                contentType: 'application/x-www-form-urlencoded',
                dataType: 'json'
            }
        })
        .then(({ data }) => {
            setResponseData(data)
            if(data.token) setToken(data.token)
        })
        .catch(({ response }) => setResponseData(response.data))
        event.preventDefault();
    },[requestData])

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