import React, { useState, useReducer, useCallback, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { Form, Button } from "react-bootstrap";
import Axios from "axios";

const BgCheck = ({ setRequestData, setResponseData, token, requestData }) => {

    useEffect(() => {
        setRequestData({})
        setResponseData()
    },[])

    const handleSubmit = useCallback((event) => {
        setResponseData('carregando')
        const data = new FormData();
        data.append('file', requestData.file)

        Axios.post('https://idneowaycheck.nxcd.com.br/api/background-check/one-file/', data, {
            headers: {
                'x-access-token': token,
            }
        })
        .then((response) => setResponseData(response.data))
        .catch(({ response }) => setResponseData(response.data))

        event.preventDefault()
    },[requestData])

    const fileHandler = useCallback((event, name) => {
        event.persist()
        if(event.target.files.length) {
            setRequestData((oldData) => ({ ...oldData, [name]: event.target.files[0] }))
        }
    })

    return (

        <Form style={{ padding: 20 }} onSubmit={handleSubmit}>
            <h3>Background Check</h3>
            <h6>file</h6>
            <input type="file" className="form-control" style={{ padding: 20, margin: 20  }} onChange={(event) => fileHandler(event, 'file')}/>
            <Button variant='primary' type='submit'>
                Enviar
            </Button>
        </Form>
    )
}

export default BgCheck;