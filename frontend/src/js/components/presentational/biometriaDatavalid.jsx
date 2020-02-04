import React, { useState, useReducer, useCallback, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { Form, Button } from "react-bootstrap";
import Axios from "axios";

const BiometriaDatavalid = ({ setRequestData, setResponseData, token, requestData }) => {

    const cpfRef = useRef()

    useEffect(() => setRequestData({}),[])

    const handleSubmit = useCallback((event) => {
        const data = new FormData();
        data.append('img1', requestData.img1)
        data.append('img2', requestData.img2)
        data.append('cpf', cpfRef.current.value)

        Axios.post('https://id.nxcd.com.br/v1.0/bio/compare-datavalid/', data, {
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
        console.log({ files: event.target.files })
        if(event.target.files.length) {
            setRequestData((oldData) => ({ ...oldData, [name]: event.target.files[0] }))
        }
    })

    const cpfHandler = useCallback(() => {
        setRequestData((oldData) => ({ ...oldData, cpf: cpfRef.current.value }))
    })

    return (

        <Form style={{ padding: 20 }} onSubmit={handleSubmit}>
            <h3>BIOMETRIA DATAVALID</h3>
            <h6>img1</h6>
            <input type="file" className="form-control" style={{ padding: 20, margin: 20  }} onChange={(event) => fileHandler(event, 'img1')}/>
            <h6>img2</h6>
            <input type="file" className="form-control" style={{ padding: 20, margin: 20  }} onChange={(event) => fileHandler(event, 'img2')}/>
            <input type="text" style={{ margin: 20  }} placeholder="CPF" ref={cpfRef} onChange={cpfHandler}/>
            <Button variant='primary' type='submit'>
                Enviar
            </Button>
        </Form>
    )
}

export default BiometriaDatavalid;