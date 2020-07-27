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

const useStyles = makeStyles({
  root: {
    background:'#007E5A',
    border: 0,
    height: '100%',
    width: '100%',
    position: "fixed",
    display: "flex"
  },
  paper:{
    height: '70%',
    width: '320%',
  },
  forms:{

  }
});

export default function EstudioAcompanhePageContainer(){
  const classes = useStyles();

    return (
      <div className={classes.root}>
        <Box mt={"300px"} ml={"200px"}>
            <Paper elevation={10} className={classes.paper} square={false}> 
              <Box ml={3}>
                <Grid container>
                  <Grid item xs={12}>
                    <Box display="flex" justifyContent="flex-start" pt={2} pb={3}>
                      <Typography variant="h5" component="h2">Bem vindo, editor </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box>
                        Box 1
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

