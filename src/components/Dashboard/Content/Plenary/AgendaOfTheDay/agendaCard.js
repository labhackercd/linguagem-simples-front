import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper'

import LaunchIcon from '@material-ui/icons/Launch';
import Divider from '@material-ui/core/Divider';

export default function AgendaCard(props){

    return (
        <Box width="97%"  >
            <Paper elevation={0} >
                <Box m={1}>
                    <Grid container>
                        <Grid item xs={10}>
                            <Box fontWeight="fontWeightRegular">
                                <Typography variant="h6" style={{ color: "#007E5A" }}>
                                    {props.pautaInfo.proposicaoNome}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Box display="flex" justifyContent="flex-end">
                                <a rel={'external noopener noreferrer'} target="_blank" href={"https://dadosabertos.camara.leg.br/api/v2/proposicoes/"+props.pautaInfo.codProposicao} style={{textDecoration: "none"}}>
                                    <IconButton aria-label="Ir para Proposicao" size="small">
                                        <LaunchIcon  fontSize="inherit" />
                                    </IconButton>    
                                </a>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box fontSize={11}>
                                {props.pautaInfo.nomRelator !== null &&
                                    <Typography style={{ color: "gray" }}>
                                        Relator: {props.pautaInfo.nomRelator} ({props.pautaInfo.partidoRelator}-{props.pautaInfo.ufRelator})
                                    </Typography>
                                }
                            </Box>
                        </Grid>
                    </Grid>
                </Box>        
                <Divider variant="middle" />
            </Paper>
        </Box>
    );
}