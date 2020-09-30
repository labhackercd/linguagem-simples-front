import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';



export default function VoteNominalCard(props){
    var voteColor = null;

    switch(props.data.codTipoVoto){
      case "S":
        voteColor = "green";//Sim
        break;
      case "N":
        voteColor = "red";//Não
        break;
      default:
        voteColor = "#2F80ED"// Liberado
        break;
    }

    return(
        <Box width="100%" marginTop={0.5}>
            <Grid container>
                <Grid item xs={10}>
                    <Typography style={{ color: "#666666" }} variant="body1">{props.data.nomParlamentarPainelEletronico} ({props.data.sigPartidoPoliticoAtual}-{props.data.sigUfEleito})</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Box display="flex" justifyContent="flex-end">
                        <Box display="flex" justifyContent="flex-end">
                            <Typography style={{ color: voteColor }} variant="body1">{props.data.nomTipoVoto}</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Divider light />
        </Box>
    );
}
