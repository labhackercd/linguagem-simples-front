import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExternalContentPanel from './externalContentPanel';
import Box from '@material-ui/core/Box'
import Youtube from './youtubeTransmission'
import VideoSnippets from './VideoSnippets/videoSnippets'

const useStyles = makeStyles((theme) => ({
  body: {
    padding: '0 1.5rem'
  },
  header: {
    margin: '1rem 0',
    display: 'flex',
    justifyContent: 'space-between',
  },
  headerTitle: {
    display: 'flex',
    alignItems: 'flex-start',
    color: theme.palette.primary.main
  },
  headerMenu: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  headerMenuItem: {
    padding: '0 1rem 0 1rem',
    alignSelf: 'flex-start'
  },
  column: {
    padding: "1rem",
  },
  firstRow: {
    margin: '0 0 0.5rem 0',
  },
  card: {
    backgroundColor: "white",
    height: 'auto',
    width: 'auto',
    margin: '1rem 0 0 0',
    minHeight: '35vh',
    minWidth: '32vh'
  },
  cardVideo: {
    backgroundColor: "white",
    height: '18vh',
    width: '32vh',
    margin: '1rem 0 0 0',
  },
  secondRow: {
    height: '16vh',
    backgroundColor: "white",
    borderRadius: '5px',
    margin: '0.5rem',
  },
  thirdRow: {
    backgroundColor: "white",
    height:'100%',
    borderRadius: '5px',
    margin: '0.5rem',
  },
  videoWrapper:{
    margin: '1rem 0 0 0',
  }
}));

export default function Content(props) {
  //<YoutubeTransmission videoId="splJnSIoe8I"></YoutubeTransmission>
  //const videoID = props.videoID;
  const videoID = "stgBjJwcnIw";
  const sessionIdDadosAbertos = props.sessionIdDadosAbertos

  const classes = useStyles();

  
  return (
		<Grid container className={classes.body}>
      <Grid container className={classes.header}>
        <Grid item className={classes.headerTitle}>
          <Typography variant="h3" className={classes.title}>Conteúdos</Typography>
        </Grid>
        <Grid item className={classes.headerMenu}>
          <Typography variant="h5" className={classes.headerMenuItem}> Sincronizar </Typography>
          <Typography variant="h5" className={classes.headerMenuItem}> Ver Acompanhe </Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.firstRow} spacing={2}>
          <Grid item md={7}>
            <Typography variant="h5"> Transmissão </Typography>
            <div className={classes.card}>
                {videoID ? 
                  Youtube(videoID) :
                  <Box width="100%" height="100%" display="flex" alignContent="center" justifyContent="center">
                      <Typography variant="h5" style={{ color: "grey" }}> Transmissão não disponível</Typography>
                  </Box>
                }
            </div>   
          </Grid>
          <Grid item md={5}>
            <Typography variant="h5"> Plenário </Typography>
            <Paper elevation={0} className={classes.card}> 
              
            </Paper>
          </Grid>
      </Grid>
      <Grid container className={classes.secondRow}>
        {/*<Grid item xs={12}>
          <Typography variant="h5" style={{margin: '1rem 0 1rem 1rem'}}> Trechos </Typography>
              </Grid>*/}
        <VideoSnippets></VideoSnippets>
      </Grid>
      <Grid container className={classes.thirdRow}>
        <ExternalContentPanel></ExternalContentPanel>
      </Grid>
		</Grid>
  )
}
