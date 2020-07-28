import React, {Component} from 'react';
import { Paper, Box, Grid, TextField, Button } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { palette, spacing } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import { colors } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#F2F2F2",
    border: 0,
    height: '100vh',
    width: '100%',
    position: 'fixed',
    display: 'flex',
    fontFamily: 'Open sans',
  },
  sidebar: {
  	height: "100vh",
  	backgroundColor: "#00AF82",
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
  prototipo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%',
    marginTop: '5rem',
  }, 
  loginButton: {
    backgroundColor: '#C4C4C4',
    color: 'white',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: "#00AF82"
    }
  }, 
  forgotPassword: {
    color: '#666',
    textDecoration: 'none',
  },
}));

export default function LoginScreen () {
  	const classes = useStyles();
		return (
      <div className={classes.body}>
 				<Grid container className={classes.container}>
 					<Grid item xs={12} sm={6} md={6} className={classes.loginBox}>
 							<Grid container item xs={6} sm={6} md={6} style={{display: 'flex', justifyContent: 'space-between'}}>
                <div className="formItems">
                  <Grid item>
                    <img src="../../img/estudio_acompanhe_logo.svg"/>
                  </Grid>
                  <Grid item className={classes.loginForm}>
                    <TextField className={classes.textField} variant="outlined" placeholder="email" id="username" type="email" fullWidth autoFocus required />
                    <TextField className={classes.textField} variant="outlined" placeholder="senha" id="password" type="password" fullWidth required />
                  </Grid>
                  <Grid container style={{margin: '1rem 0 0 0', display: 'flex', justifyContent: 'space-between'}}>
                    <Grid item>
                      <Button className={classes.loginButton} style={{justifyContent: 'flex-start'}} variant="contained">Acessar</Button>
                    </Grid>
                    <Grid item style={{justifyContent: 'flex-end'}}>
                      <a href="/" className={classes.forgotPassword}>Esqueci a senha </a>
                    </Grid>
                  </Grid>
                </div>
                <div className="camaraLogo">
                  <Grid item style={{justifyContent: 'flex-end', margin: '5rem 0 -10rem 0'}}>
                    <img src="../../img/camara_logo.svg"/> 
                  </Grid>
                </div>
 							</Grid>
 					</Grid>
          <Grid item xs={12} sm={5} md={5}>
            <div className={classes.prototipo}>
              <img src="../../img/interacao_prototipo.png"/>
            </div>            
          </Grid>
 					<Grid item xs={12} sm={1} md={1} className={classes.sidebar}>
 						<Box>
 						</Box>
 					</Grid> 
 				</Grid>
      </div>
		)
	}


