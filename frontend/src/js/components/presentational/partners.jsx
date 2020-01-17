import React, { useEffect, useState } from "react";
import { useRouteMatch, Switch, Route } from "react-router";
import { Link } from "react-router-dom";

import Products from "./products.jsx";

const Partners = ({ backend, addToCart }) => {

    const [partners, setPartners] = useState([])
    const match = useRouteMatch()

    useEffect(() => {

        fetch(backend+'partners')
            .then((response) => response.text())
            .then(JSON.parse)
            .then(setPartners)
            .catch((reason) => console.log({ reason }))

    },[]);

    return (
        
            <Switch>
                <Route path={match.path+'/:partnerName'}>
                    <Products backend={backend} addToCart={addToCart}/>
                </Route>
                <Route path={match.path}>
                    <div style={{ paddingTop: 70 }}>
                        {partners.map(({ name, img }) =>
                            (
                                <Link to={match.url+'/'+name} style={{ display: 'inline-flex', width: '25%', padding: 20 }}>
                                    <div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', borderWidth: 1, borderColor: '#E0E0E0', borderStyle: 'solid', padding: 20 }}>
                                        <img src={img} style={{ width: '50%' }}/>
                                        <h2 style={{ color: 'black' }}>{name}</h2>
                                    </div>
                                </Link>
                            )
                        )}
                    </div>
                </Route>
            </Switch>
    );
}

export default Partners;