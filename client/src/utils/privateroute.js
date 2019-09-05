import React from 'react';
import auth from'./auth';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        auth.getSession('isAuthenticated') ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
           
          />  
        )
      }
    />
  );

export default PrivateRoute;