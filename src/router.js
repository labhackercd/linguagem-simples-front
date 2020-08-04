import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";

import EstudioAcompanhePageContainer from './containers/EstudioAcompanhePageContainer'
import LoginScreen from "./containers/LoginScreenContainer"
import axiosInstance from './auth/axiosApi'


 function checkIfUserIsAuthenticated(callback){
    console.log("Checking user authorized")

    try{
        const response =   axiosInstance.post('/token/verify/', {
            token: localStorage.getItem('access_token')
        });
        console.log(response)
        if(response.status === 200){
            return true;
        }else{
            return false;
        }
    }catch(error){
        console.log("entrou erro")
        return false;
    }


};

const RequireAuth = ({ children }) => {
  const [auth, setAuth] = useState('');
  
  const checkAuthenticationToken = async () => {
    try{
       

        const response = await axiosInstance.post('/token/verify/', {
            token: localStorage.getItem('access_token')
        });
        console.log(response)
        if(response.status === 200){
            setAuth (true);
        }else{
            setAuth (false);
        }
    }catch(error){
        console.log("entrou erro")
        setAuth(false);
    }

    console.log(auth)
  };
  /*
  Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
    in RequireAuth (at router.js:85)
  */

  useEffect(() => {
    let isSubscribed = true;
    
    if (!auth) {
        checkAuthenticationToken();
    }
    return () => (isSubscribed = false)
  });

  return(
    <div>
    {auth ? {children} : <Redirect to={"/"} />}
    </div>
  );
};

const AppRouter = (props) => (
    <Switch>
        <Route exact path="/">
            <LoginScreen theme={props.theme}></LoginScreen>
        </Route>

        {/*Authenticated routes */}
        {/*<RequireAuth>*/}
            <Route exact path="/estudio">
                <EstudioAcompanhePageContainer></EstudioAcompanhePageContainer>
            </Route>
        {/*</RequireAuth>*/}
    </Switch>
);

export default AppRouter