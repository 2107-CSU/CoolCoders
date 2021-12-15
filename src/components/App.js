import React, { useState, useEffect } from 'react';
import {BrowserRouter, Route } from 'react-router-dom';

import Cart from './Cart'
import Products from './Products';
import SingleProduct from './SingleProduct';
import Header from './Header';
import Homepage from './Homepage'
import Login from './Login';

const App = () => {

  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
        setToken(storedToken);
    }
    if (!storedToken) setToken('');
    
}, [])

  return(
    <BrowserRouter>
      <Header token={token}/>
      <Route path='/login' exact render={(routeProps) => <Login {...routeProps} setToken={setToken} token={token}/> } />
      <Route path='/register' exact render={(routeProps) => <Login {...routeProps} setToken={setToken} /> } />      
      <Route path='/products' exact render={() => <Products /> }/>
      <Route path='/products/:id' exact render={() => <SingleProduct />}/>
      <Route path='/cart' exact render={() => <Cart /> } />
      <Route path='/' exact render={() => <Homepage /> } />
    </BrowserRouter>
  )
}

export default App;