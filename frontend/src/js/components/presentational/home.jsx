import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = ({ backend }) => {

    const [img, setImg] = useState(null);
    const [text, setText] = useState(null);

    useEffect(() => {

        fetch(backend+'home')
            .then((response) => {
                response.text()
                    .then(JSON.parse)
                    .then((body) => {
                        setImg(body.img)
                        setText(body.text)
                    })
            })
            .catch((reason) => console.log({ reason }))

    },[])

    return (
        <div style={{ backgroundColor: 'black', paddingTop: 70 }}>
            <img src={img} style={{ width: '100%', opacity: 0.3 }}/>
            <div style={{ display: 'inline-flex', position: 'absolute', width: '80%', height: '100%', left: '10%', zIndex: 100, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <h1 style={{ color: 'white', fontSize: 80, textAlign: 'center' }}>{text}</h1>
                <Link style={{ color: 'white', textDecoration: 'none', fontSize: 30, margin: 30 }} to="/partners">Ver Lojas Parceiras</Link>
            </div>
        </div>
    );
}

export default Home;