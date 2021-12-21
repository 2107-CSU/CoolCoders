import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';

const ProtectedRoute = ({  user: user, token: token, component: Component, ...rest }) => {

    useEffect(() => {
        console.log(user);
    }, []);

    return (
    <Route 
      {...rest} 
      render={(props) => {
        if (user && user.userStatus === 'admin') {
          console.log('following user allowed access = ', user);
          console.log('user.userStatus === ', user.userStatus)
          return  <Component token={token}/>
        } 
      }
    } />
  )
}

export default ProtectedRoute;