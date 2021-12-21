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
        if (token) {
          console.log('user inside ProtectedRoute = ', user);
          return  <Component />
        } else {
          console.log('user inside ProtectedRoute = ', user);
          return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        }
      }
    } />
  )
}

export default ProtectedRoute;