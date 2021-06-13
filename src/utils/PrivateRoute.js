import { Route, Redirect } from 'react-router-dom';
import React from "react";
import AuthContext from "../utils/AuthContext";


const PrivateRoute = ({ component: Component, ...rest }) => {
    const { authState } = React.useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={props => (
                authState.isAuthenticated
                    ?
                    <Component {...props} />
                    :
                    <Redirect to={'/login'} />
            )
            }
        />
    )
};



export default PrivateRoute;