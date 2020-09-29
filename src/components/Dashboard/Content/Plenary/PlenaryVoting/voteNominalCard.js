import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';



export default function VoteNominalCard(props){
    var voteColor = null;


    switch(props.data.codOrientacaoVotacao){
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
                <Grid item xs={6}>
                    <Typography style={{ color: "#666666" }} variant="body1">{props.data.nomReduzido} ({props.data.sigPartido}-{props.data.sigUF})</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Box display="flex" justifyContent="flex-end">
                        <Box display="flex" justifyContent="flex-end">
                            <Typography style={{ color: voteColor }} variant="body1">{props.data.nomOrientacaoVotacaoResumido}</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Divider light />
        </Box>
    );
}
