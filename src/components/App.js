import React, { useState, useEffect } from 'react';
import {BrowserRouter, Route } from 'react-router-dom';

import Cart from './Cart'
import Products from './Products';

const App = () => {

  return(
    <BrowserRouter>
      <Route path='/products' exact render={() => <Products /> }/>
      <Route path='/cart' exact render={() => <Cart /> } />
    </BrowserRouter>
  )
}

export default App;