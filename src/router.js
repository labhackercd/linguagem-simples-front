import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import EstudioAcompanhePageContainer from './containers/EstudioAcompanhePageContainer';
import LoginScreen from "./containers/LoginScreenContainer";
import Dashboard from "./containers/DashboardContainer";
import axiosInstance from './auth/axiosApi';
import {TOKEN_VERIFY_URL, INITIAL_PAGE_URL, ESTUDIO_PAGE_URL, DASHBOARD_PAGE_URL} from './api_urls'


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
        try{
            const response = await axiosInstance.post(TOKEN_VERIFY_URL, {
                token: localStorage.getItem('access_token')
            });

            if(response.status === 200){
                this.setState({isAuthenticaded:true})
            }else{
                this.setState({isAuthenticaded:false});
            }
            callback()
        }catch(error){
            callback();
        }
    };

    componentDidMount(){
        this._isMounted = true;
        if(this._isMounted){

            this.checkIfUserIsAuthenticated( () => {
                this.setState({isLoadingPage:false})
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
    <Router>
        <Switch>
            <Route exact path={INITIAL_PAGE_URL}>
                <LoginScreen theme={props.theme}></LoginScreen>
            </Route>
            {/*Authenticated routes */}
            <PrivateRouteAuth>
                <Route exact path={DASHBOARD_PAGE_URL} children={<Dashboard />} theme={props.theme} />
                <Route exact path={ESTUDIO_PAGE_URL}>
                    <EstudioAcompanhePageContainer></EstudioAcompanhePageContainer>
                </Route>
            </PrivateRouteAuth>
        </Switch>
    </Router>
);

export default AppRouter
