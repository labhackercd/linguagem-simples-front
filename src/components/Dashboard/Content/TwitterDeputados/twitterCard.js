import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper'
import LaunchIcon from '@material-ui/icons/Launch';


export default function TwitterCard(props){

    return (
        <Box width="100%" marginTop={0.5}>
            <Paper elevation={0}  style={{background:'#F4F4F4',}}>
                <Grid container>
                    <Grid item xs={12}>
                        <a rel={'external noopener noreferrer'} target="_blank" href={props.data.twitter} style={{textDecoration: "none"}}>
                            <Box m={1}>
                                <Grid container>
                                    <Grid item xs={11}>
                                        <Typography style={{ color: "gray" }} variant="body1">{props.data.nome} ({props.data.partido}-{props.data.uf})</Typography>
                                    </Grid>
                                    <Grid item xs={1}>                        
                                        <Box display="flex" flexDirection="row-reverse">
                                            <IconButton aria-label="Ir para Twitter" size="small">
                                                <LaunchIcon  fontSize="inherit" />
                                            </IconButton>        
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </a>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
  }