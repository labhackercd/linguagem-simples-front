import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Grid  from "@material-ui/core/Grid";
import Typography  from "@material-ui/core/Typography";
import { palette } from '@material-ui/system';
import { spacing } from '@material-ui/system';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { colors } from "@material-ui/core";

import NewSessionFormComponent from '../../components/EstudioAcompanhePageComponents/NewSessionFormComponent'

import AcompanheLogo from './logo_acompanhe.svg'
import BackgroundImage from './background.svg'


const useStyles = makeStyles({
  root: {

    backgroundImage: "url(" + BackgroundImage + ")",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    border: 0,
    height: '100%',
    width: '100%',
    position: "fixed",
    display: "flex"
  },
  paper:{
    width: '80%',
  },
  box:{
    paddingLeft:"370px",
    paddingTop:"250px",
    width:'100%',
    height:'100%'
  },
  logo:{
    marginBottom:"20px"
  }
});

export default function EstudioAcompanhePageContainer(){
  const classes = useStyles();

    return (
      <div className={classes.root}>
        <Box className={classes.box}>
            <Box className={classes.logo}>
                <img src={AcompanheLogo} alt="Kiwi standing on oval"></img>
            </Box>
      
              <Paper elevation={10} className={classes.paper} square={false}> 
                <Box ml={5}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Box display="flex" justifyContent="flex-start" pt={3} pb={4}>
                        <Typography variant="h3">Bem vindo, editor </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box>
                          <NewSessionFormComponent></NewSessionFormComponent>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box>
                          Box 2
                      </Box>
                    </Grid>                 
                  </Grid>
                </Box>
              </Paper>
          
          
        </Box>
      </div>
    );

}

