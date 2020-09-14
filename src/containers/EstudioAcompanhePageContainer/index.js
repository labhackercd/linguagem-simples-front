import React from "react";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Grid  from "@material-ui/core/Grid";
import Typography  from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';

import NewSessionFormComponent from '../../components/EstudioAcompanhePageComponents/NewSessionFormComponent';
import SessionHistoryComponent from '../../components/EstudioAcompanhePageComponents/SessionHistoryComponent';
import LogoutButton from '../../components/LogoutButton'

import AcompanheLogo from './logo_acompanhe.svg';
import BackgroundImage from './background.svg';


const useStyles = makeStyles({
  root: {
    backgroundImage: "url(" + BackgroundImage + ")",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    minHeight: '100%',
    minWidth:'100%',
    position: "fixed",
    display: "flex"
  },
  paper:{
    width: '75%',
  },
  box:{
    paddingLeft:"370px",
    paddingTop:"0%",
    width:'80%',
    height:'100%'
  },
  logo:{
    marginBottom:"20px"
  },
  button:{
    minHeight: '100%',
    minWidth:'100%',
    position: "fixed",
    display: "flex"
  }
});

export default function EstudioAcompanhePageContainer(){
  const classes = useStyles();

    return (
      <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Box display="flex"  justifyContent="flex-end" margin={2}>
            <LogoutButton></LogoutButton>
          </Box>
        </Grid>
        <Grid item xs={12}>
        <Box className={classes.box}>
            <Box className={classes.logo}>
                <img src={AcompanheLogo} alt="Logo Estudio Acompanhe"></img>
            </Box>  
              <Paper borders={10} elevation={10} className={classes.paper} square={false}> 
                <Box ml={5}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Box display="flex" justifyContent="flex-start" pt={3} pb={4}>
                        <Typography variant="h3">Bem vindo, editor </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={5}>
                      <Box>
                          <NewSessionFormComponent></NewSessionFormComponent>
                      </Box>
                    </Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={4}>
                      <Box >
                          <SessionHistoryComponent></SessionHistoryComponent>
                      </Box>
                    </Grid>                 
                  </Grid>
                </Box>
              </Paper>
        </Box>
        </Grid>
      </Grid>
       
      </div>
    );

}

