import React, { Component } from "react";
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

class PrivateRouteAuth extends Component{
    constructor(props){
        super(props);
        this.state = { 
          isAuthenticaded: false,
          isLoadingPage:"true"
        };
        this.checkIfUserIsAuthenticated = this.checkIfUserIsAuthenticated.bind(this);
    }

    async checkIfUserIsAuthenticated(callback){
        console.log("Checking user authorized")
    
        try{
            const response = await axiosInstance.post('/token/verify/', {
                token: localStorage.getItem('access_token')
            });
            
            if(response.status === 200){
                console.log("response status == 200")
                this.setState({isAuthenticaded:true})
            }else{
                console.log("response status != 200")
                this.setState({isAuthenticaded:false});
            }
            callback()
        }catch(error){
            console.log("entrou erro")
            callback();
        }
    };

    componentDidMount(){
        this._isMounted = true;
        if(this._isMounted){

            this.checkIfUserIsAuthenticated( () => {
                console.log("voltou callback")
                this.setState({isLoadingPage:false})
                console.log("IsAuthenticaded: "+this.state.isAuthenticaded)
                console.log("PageIsLoading: "+this.state.isLoadingPage)
              });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render(){
        const children = this.props.children;

        //Wait until all informations be fetch until continue
        if(this.state.isLoadingPage) {
            return null;
        }

        return(
            <div>
                {this.state.isAuthenticaded ? children : <Redirect to={"/"} /> }
            </div>
          );
    }

}


const AppRouter = (props) => (
    <Switch>
        <Route exact path="/">
            <LoginScreen theme={props.theme}></LoginScreen>
        </Route>

        {/*Authenticated routes */}
        <PrivateRouteAuth>
            <Route exact path="/estudio">
                <EstudioAcompanhePageContainer></EstudioAcompanhePageContainer>
            </Route>
        </PrivateRouteAuth>
    </Switch>
);

export default AppRouter