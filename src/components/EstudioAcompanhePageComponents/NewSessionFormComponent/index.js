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

export default function NewSessionFormComponent(){
  const classes = useStyles();

    return (

        <Box>
            <Grid container>
                <Grid item>
                    <Typography variant="h4" color="textSecondary">Nova sessão</Typography>
                </Grid>
                <Grid item>
                    <Grid container>

                    </Grid>
                </Grid>
            </Grid>
        </Box>

    );

}

