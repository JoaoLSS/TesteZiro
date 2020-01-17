import React, { useEffect, useState } from "react";
import { useRouteMatch, Switch, Route, useParams } from "react-router";
import { Link } from "react-router-dom";

const Products = ({ backend, addToCart }) => {

    const { partnerName } = useParams()
    const [products,setProducts] = useState(['calça','camisa'])

    useEffect(() => {

        fetch(backend+'products')
            .then(response => response.text())
            .then(JSON.parse)
            .then(setProducts)
            .catch(reason => console.log({ reason }))

    },[])

    return (
        <div style={{ paddingTop: 70, flexDirection: 'column' }}>
            <h1 style={{ padding: 50 }}>{partnerName}</h1>
            <div>
                {
                    products.map(({ name, price }) => (
                        <div style={{ display: 'inline-flex', width: '25%', padding: 20 }}>
                            <div style={{ display: 'inline-flex', width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <h1>{name}</h1>
                                <h6>{'R$'+price+',00 / 100 peças'}</h6>
                                <button onClick={() => addToCart({ name, price, partnerName })} style={{ backgroundColor: 'transparent' }}>Colocar no carrinho</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
} 

export default Products