import React from 'react';
import { Grid, Typography} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper'

export default function VoteOrientationCard(props){
    //console.log(props)
    const mod = parseInt(props.info.numOrdemOrientacao) % 4;
    var color = null;
    var voteColor = null;

    if(mod === 1 || mod === 0){
      color = "#F4F4F4";
    }else{
      color = "#FFFFFF";
    }

    switch(props.info.codOrientacaoVotacao){
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

    return (  
      <Grid item xs={6}>
        <Box width="96%">        
          <Paper elevation={0} style={{background:color}} >
            <Grid container>
              <Grid item xs={6}>
              <Typography style={{ color: "#666666" }} variant="body1">{props.info.nomRepresentacaoPartidaria}</Typography>
              </Grid>
              <Grid item xs={6}>
                  <Box display="flex" justifyContent="flex-end">
                    <Typography style={{ color: voteColor }} variant="body1">{props.info.nomOrientacaoVotacaoResumido}</Typography>
                  </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Grid>
    )

  }