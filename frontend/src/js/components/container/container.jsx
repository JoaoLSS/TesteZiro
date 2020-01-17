import React, { useState, useReducer, useCallback } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Icon from "react-web-vector-icons";
import { Home, KnowMore, Partners } from "../presentational";
import logo from "../../../assets/logo-app.png";

const linkStyle = { margin: 10, color: 'white', textDecoration: 'none' }

const reducer = (state, { type, item, index }) => {
    switch(type) {
        case 'add':
            return [...state, item ];
        case 'delete':
            return state.filter((_,_index) => _index != index);
    }
}

const backend = 'https://rjsel5rowc.execute-api.us-east-1.amazonaws.com/dev/';

const Container = () => {

    const [cart, dispatch] = useReducer(reducer,[]);
    const [cartOpen, setCartOpen] = useState(false);

    const addToCart = useCallback((item) => dispatch({ type: 'add', item }),[]);
    const deleteFromCart = useCallback((index) => dispatch({ type: 'delete', index }),[]);

    return (
        <Router>
            <div>
                <header style={{ display: 'flex', width: '100%', backgroundColor: 'black', alignItems: 'center', justifyContent: 'space-between', position: 'fixed', top: 0, zIndex: 1000 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                        <img src={logo} alt="logo" style={{ height: 50, width: 50, margin: 10, marginLeft: 20 }}/>
                        <Link style={linkStyle} to="/">Início</Link>
                        <Link style={linkStyle} to="/partners">Lojas Parceiras</Link>
                        <Link style={linkStyle} to="/knowmore">Saiba Mais</Link>
                    </div>
                    <button style={{ margin: 10, marginRight: 20, backgroundColor: 'transparent', color: 'white', borderColor: 'transparent', display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => setCartOpen(!cartOpen)}>
                        {
                            cart.length ?
                            <div style={{ display: 'inline-flex', height: 20, width: 20, backgroundColor: 'red', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                            { cart.length }
                            </div>
                            : null
                        }
                        <Icon font='EvilIcons' name='cart' color='white' size={30}/>
                    </button>
                </header>
                {
                    cartOpen ?
                    (
                        <div style={{ display: 'inline-flex', width: 300, position: 'fixed', right: 10, top: 80, backgroundColor: 'black', padding: 10, flexDirection: 'column', zIndex: 1000 }}>
                            {
                                cart.length ?
                                    cart.map(({ name, price, partnerName },index) => (
                                        <div style={{ width: '100%', borderColor: 'white', borderWidth: 1, borderStyle: 'solid', padding: 10 }}>
                                            <div style={{ display: 'inline-flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                                <h1 style={{ display: 'inline-flex', color: 'white', fontSize: 16 }}>{name}</h1>
                                                <h1 style={{ display: 'inline-flex', color: 'white', fontSize: 14 }}>{'R$'+price+',00'}</h1>
                                                <button style={{ backgroundColor: 'red', borderColor: 'transparent', color: 'white' }} onClick={() => deleteFromCart(index)}>
                                                    Excluir
                                                </button>
                                            </div>
                                            <h1 style={{ display: 'inline-flex', color: 'white', fontSize: 12 }}>{partnerName}</h1>
                                        </div>
                                    ))
                                :
                                    <div style={{ color: 'white' }}>Nenhum produto adcionado</div>
                            }
                        </div>
                    ) : null
                }
                <Switch>
                    <Route path="/partners">
                        <Partners backend={backend} addToCart={addToCart} />
                    </Route>
                    <Route path="/knowmore">
                        <KnowMore backend={backend} />
                    </Route>
                    <Route path="/">
                        <Home backend={backend} />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
};

export default Container;

const wrapper = document.getElementById("reactWrapper");
wrapper && ReactDOM.render(<Container />, wrapper);