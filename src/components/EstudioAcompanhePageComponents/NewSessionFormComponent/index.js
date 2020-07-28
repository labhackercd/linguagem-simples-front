import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import Grid  from "@material-ui/core/Grid";
import Typography  from "@material-ui/core/Typography";
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem';
import SendIcon from '@material-ui/icons/Send';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const useStyles = makeStyles({
  root: {
    background:'#007E5A',
    border: 0,
    height: '100%',
    width: '100%',
    position: "fixed",
    display: "flex"
  },
  input:{
      color: "green"
  }

});

export default function NewSessionFormComponent(){
  const classes = useStyles();

    return (

        <Box>
            <Grid container>
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="flex-start" paddingBottom={3}>
                        <Typography variant="h4" color="textSecondary">Nova sessão</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Grid container xs={12} spacing={2}>
                        <Grid item xs={4}>
                            <Box display="block" justifyContent="flex-start" >
                                <div><Typography variant="h6"> Local </Typography></div>
                                <TextField
                                className={classes.input}
                                id="sessionPlace"
                                variant="outlined"
                                size="small"
                                color="primary"
                                value="Plenário"
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={7}>
                            <Box display="block" justifyContent="flex-start" >
                                <div><Typography variant="h6"> Local </Typography></div>
                                <TextField id="select" value="1" variant="outlined" size="small" fullWidth="true" disabled select>
                                    <MenuItem value="1">Selecione</MenuItem>
                                </TextField>
                            </Box>
    
                        </Grid>
                        <Grid item xs={4}>
                            <Box display="block" justifyContent="flex-start" >
                                <div><Typography variant="h6"> Data </Typography></div>
                                 <TextField
                                    id="date"
                                    type="date"
                                    variant="outlined"
                                    defaultValue="0000-00-00"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    size="small"
                                    fullWidth="true"
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={7}>
                            <Box display="block" justifyContent="flex-start" >
                                <div><Typography variant="h6"> Tipo de Sessão </Typography></div>
                                <TextField id="select" value="1" variant="outlined" size="small" fullWidth="true" select>
                                    <MenuItem value="1">Selecione</MenuItem>
                                </TextField>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="block" justifyContent="flex-start" >
                                <div><Typography variant="h6"> Canais de transmissão </Typography></div>
                                <FormGroup aria-label="position" row>
                                    <FormControlLabel
                                    value="Acompanhe"
                                    control={<Checkbox color="primary" />}
                                    label="Acompanhe"
                                    labelPlacement="Acompanhe"
                                    />
                                    <FormControlLabel
                                    value="Twitter"
                                    control={<Checkbox color="primary" />}
                                    label="Twitter"
                                    labelPlacement="Twitter"
                                    />
                                </FormGroup>
                            </Box>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
            <Box pt={4} pb={8}>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<SendIcon />}
                >
                    Iniciar Sessão
                </Button>
            </Box>
        </Box>

    );

}

