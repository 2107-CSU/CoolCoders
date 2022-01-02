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
      render={(routeProps) => {
        if (user && user.userStatus === 'admin') {
          console.log('following user allowed access = ', user);
          console.log('user.userStatus === ', user.userStatus)
          return  <Component token={token} user={user} {...routeProps}/>
        } else {
          return <Redirect to={{ pathname: '/', state: { from: routeProps.location } }} />
        }
      }
    } />
  )
}

export default ProtectedRoute;