import React, { useState, useReducer, useCallback, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { Form, Button } from "react-bootstrap";
import Axios from "axios";

const CompRes = ({ setRequestData, setResponseData, token, requestData }) => {

    const cpfRef = useRef()

    useEffect(() => setRequestData({}),[])

    const handleSubmit = useCallback((event) => {
        const data = new FormData();
        data.append('file', requestData.file)
        data.append('cpf', cpfRef.current.value)

        Axios.post('https://id.nxcd.com.br/v1.0/proof-of-residence/single-file/', data, {
            headers: {
                'x-access-token': token,
            }
        })
        .then((response) => setResponseData(response.data))
        .catch((error) => console.log({ error }))

        event.preventDefault()
    },[requestData])

    const fileHandler = useCallback((event) => {
        event.persist()
        if(event.target.files.length) {
            setRequestData((oldData) => ({ ...oldData, file: event.target.files[0] }))
        }
    })

    const cpfHandler = useCallback(() => {
        setRequestData((oldData) => ({ ...oldData, cpf: cpfRef.current.value }))
    })

    return (

        <Form style={{ padding: 20 }} onSubmit={handleSubmit}>
            <h3>Comprovante de Residencia</h3>
            <input type="file" className="form-control" style={{ padding: 20, margin: 20  }} onChange={fileHandler}/>
            <input type="text" style={{ margin: 20  }} placeholder="CPF" ref={cpfRef} onChange={cpfHandler}/>
            <Button variant='primary' type='submit'>
                Enviar
            </Button>
        </Form>
    )
}

export default CompRes;