import React from 'react';
import {Redirect } from "react-router-dom";

import { Grid, TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import axiosInstance from './../../auth/axiosApi.js'
import {ESTUDIO_PAGE_URL,APPLICATION_RESET_PASSWORD_URL} from './../../api_urls';
import sendLoginRequest from './sendLoginRequest'
import Alert from '@material-ui/lab/Alert';
import EstudioAcompanheIcon from './../../assets/estudio_acompanhe_logo.svg';
import CamaraLogoIcon from './../../assets/camara_logo.svg';
import PrototipoIcon from './../../assets/interacao_prototipo.png';

const useStyles = theme => ({
  body: {
    backgroundColor: "#00AF82",
    height: '100vh',
    fontFamily: 'Open Sans',
    position: 'fixed',
    display: 'flex',
    border: 0,
  },
  sidebar: {
  	height: "100vh",
  },
  loginArea: {
    height: '100vh',
    backgroundColor: '#F2F2F2'
  },
  loginBox: {
    display: 'flex',
    flexDirection:  'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '40vh',
    marginTop: "12rem",
  },
  loginForm: {
    margin: '1rem 0 0 0',
  },
  textField: {
    margin: '1rem 0 0 0',
    backgroundColor: 'white',
    color: '#666',
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#666"
    }
  },
  prototipoArea: {
    height: '100vh',
    backgroundColor: '#F2F2F2',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '0 25px 0 0',
  },
  loginButton: {
    backgroundColor: '#C4C4C4',
    color: 'white',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: "#00AF82"
    },
    justifyContent: 'flex-start',
  },
  buttonArea: {
    margin: '1rem 0 0 0',
    display: 'flex',
    justifyContent: 'space-between'
  },
  forgotPassword: {
    color: '#666',
    textDecoration: 'none',
    justifyContent: 'flex-end',
  },
  camaraLogo: {
    justifyContent: 'flex-end',
    margin: '5rem 0 -10rem 0'
  }
});

class LoginScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username:"",
      password:"" ,
      succesfullLogin:false,
      error:{
        status:false,
        message:"Erro - Email ou senha incorreta. Tente novamente."
      },

    };
    this.loginMethod = this.loginMethod.bind(this);
  }
 

  async loginMethod(event){
    event.preventDefault();
    //const history = useHistory();
    try{
      //console.log("chamou")
      const result = await sendLoginRequest(this.state.username,this.state.password );
      //console.log(result.status)
      if(result.status===200){
        axiosInstance.defaults.headers['Authorization'] = "JWT " + result.data.access;
        localStorage.setItem('access_token', result.data.access);
        localStorage.setItem('refresh_token', result.data.refresh);
        this.setState({succesfullLogin:true})
        
      }else{
        this.setState({error:{status:true, message:"Erro desconhecido. Tente novamente em alguns minutos."}})
      }
    }catch(e){
      if(e.name === "TypeError"){
        this.setState({error:{status:true, message:"Erro no servidor. Tente novamente em alguns minutos."}})
      }else if(e.name === "Error"){
        this.setState({error:{status:true, message:" Email ou senha incorretos. Tente novamente."}})
      }
      /*
      switch(e.name) {
        case "TypeError": // Server didn't answered 
          this.setState({error:{status:true, message:"Erro no servidor. Tente novamente em alguns minutos."}})
          break;
        case "Error": // 401 - Username or password wrong
          this.setState({error:{status:true, message:" Email ou senha incorretos. Tente novamente."}})
          break;
        default:
          this.setState({error:{status:true, message:"Erro desconhecido. Tente novamente em alguns minutos."}})
      }*/
    }
  }

  handleEmailFormChange = (e) =>
  {
    this.setState({username: e.target.value});
  };

  handlePasswordFormChange = (e) =>
  {
    this.setState({password: e.target.value});
  };


  render(){
    const { classes } = this.props;

      if(this.state.succesfullLogin) {
        return <Redirect to={ESTUDIO_PAGE_URL}/>
      }
      return (
        <div>
          {this.state.succesfullLogin ?
            <div>oi</div>
            :
            <Grid container className={classes.body}>
              <div className={classes.loginArea}>
                <Grid item xs={12} sm={6} md={6} className={classes.loginBox}>
                    <Grid container item xs={6} sm={6} md={6} style={{display: 'flex', justifyContent: 'space-between'}}>
                      <div className="formItems">
                        <Grid item>
                          <img src={EstudioAcompanheIcon} alt="Estudio Acompanhe logo"/>
                        </Grid>
                        <Grid item className={classes.loginForm}>
                          {this.state.error.status ?
                            <Alert severity="error">{this.state.error.message}</Alert>
                          : null}     
                          <TextField className={classes.textField} variant="outlined" value={this.state.username} placeholder="email" id="username" type="email" onChange={(e)=>{this.handleEmailFormChange(e)}} fullWidth autoFocus required />
                          <TextField className={classes.textField} variant="outlined" value={this.state.password} placeholder="senha" id="password" type="password" onChange={(e)=>{this.handlePasswordFormChange(e)}} fullWidth required />
                        </Grid>
                        <Grid container className={classes.buttonArea}>
                          <Grid item>
                            <Button className={classes.loginButton} onClick={this.loginMethod} variant="contained">Acessar</Button>
                          </Grid>
                          <Grid item>
                            <a href={APPLICATION_RESET_PASSWORD_URL} className={classes.forgotPassword}>Esqueci a senha </a>
                          </Grid>
                        </Grid>
                      </div>
                      <div className="camaraLogo">
                        <Grid item className={classes.camaraLogo}>
                          <img src={CamaraLogoIcon} alt="Câmara dos Deputados Logo"/>
                        </Grid>
                      </div>
                    </Grid>
                </Grid>
              </div>
              <Grid item xs={12} sm={5} md={5}>
                <div className={classes.prototipoArea}>
                  <div style={{margin: '10rem 0 0 0'}}>
                    <img src={PrototipoIcon} alt="Imagem ilustrativa da interação do protótipo"/>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={1} md={1} className={classes.sidebar}></Grid>
            </Grid>
        }
        </div>

      )
    }

  }

  LoginScreen.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(useStyles)(LoginScreen);
