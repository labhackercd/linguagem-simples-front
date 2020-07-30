import React from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
}));

export default function LoginScreen () {
  	const classes = useStyles();
		return (
      <Grid container className={classes.body}>
      <div className={classes.loginArea}>
        <Grid item xs={12} sm={6} md={6} className={classes.loginBox}>
            <Grid container item xs={6} sm={6} md={6} style={{display: 'flex', justifyContent: 'space-between'}}>
              <div className="formItems">
                <Grid item>
                  <img src="../../img/estudio_acompanhe_logo.svg" alt="Estudio Acompanhe logo"/>
                </Grid>
                <Grid item className={classes.loginForm}>
                  <TextField className={classes.textField} variant="outlined" placeholder="email" id="username" type="email" fullWidth autoFocus required />
                  <TextField className={classes.textField} variant="outlined" placeholder="senha" id="password" type="password" fullWidth required />
                </Grid>
                <Grid container className={classes.buttonArea}>
                  <Grid item>
                    <Button className={classes.loginButton} variant="contained">Acessar</Button>
                  </Grid>
                  <Grid item>
                    <a href="/" className={classes.forgotPassword}>Esqueci a senha </a>
                  </Grid>
                </Grid>
              </div>
              <div className="camaraLogo">
                <Grid item className={classes.camaraLogo}>
                  <img src="../../img/camara_logo.svg" alt="Câmara dos Deputados Logo"/>
                </Grid>
              </div>
            </Grid>
        </Grid>
        </div>
        <Grid item xs={12} sm={5} md={5}>
          <div className={classes.prototipoArea}>
            <div style={{margin: '10rem 0 0 0'}}>
              <img src="../../img/interacao_prototipo.png" alt="Imagem ilustrativa da interação do protótipo"/>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={1} md={1} className={classes.sidebar}>
        </Grid>
      </Grid>
		)
	}
