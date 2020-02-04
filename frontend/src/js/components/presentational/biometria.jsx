import React, { useState, useReducer, useCallback, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { Form, Button } from "react-bootstrap";
import Axios from "axios";

const Biometria = ({ setRequestData, setResponseData, token, requestData }) => {

    useEffect(() => setRequestData({}),[])

    const handleSubmit = useCallback((event) => {
        const data = new FormData();
        data.append('img1', requestData.img1)
        data.append('img2', requestData.img2)

        Axios.post('https://id.nxcd.com.br/v1.0/bio/new-face-compare/', data, {
            headers: {
                'x-access-token': token,
            }
        })
        .then((response) => setResponseData(response.data))
        .catch((error) => console.log({ error }))

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
            <h3>BIOMETRIA</h3>
            <h6>img1</h6>
            <input type="file" className="form-control" style={{ padding: 20, margin: 20  }} onChange={(event) => fileHandler(event, 'img1')}/>
            <h6>img2</h6>
            <input type="file" className="form-control" style={{ padding: 20, margin: 20  }} onChange={(event) => fileHandler(event, 'img2')}/>
            <Button variant='primary' type='submit'>
                Enviar
            </Button>
        </Form>
    )
}

export default Biometria;