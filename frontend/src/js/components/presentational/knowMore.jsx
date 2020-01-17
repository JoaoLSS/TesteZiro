import React, { useEffect, useState } from "react";

const KnowMore = ({ backend }) => {

    const [textStructure, setTextStructure] = useState({})

    useEffect(() => {

        fetch(backend+'knowmore')
            .then(response => response.text())
            .then(JSON.parse)
            .then(setTextStructure)
            .catch(reason => console.log({ reason }))

    },[])

    return (
        <div style={{ paddingTop: 90, flexDirection: 'column', paddingRight: 100, paddingLeft: 100 }}>
        { textStructure.title && <h1>{textStructure.title}</h1> }
        { textStructure.subtitle && <h4 style={{ padding: 20 }}>{textStructure.subtitle}</h4> }
        {
            textStructure.sections && textStructure.sections.map(({ title, text }) => (
                <div>
                    <h3>{title}</h3>
                    <h6 style={{ padding: 20 }}>{text}</h6>
                </div>
            ))
        }
        </div>
    );
}

export default KnowMore;