import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExternalContentPanel from './externalContentPanel';
import Box from '@material-ui/core/Box'
import Youtube from './youtubeTransmission'
import { palette } from '@material-ui/system';

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
    margin: '0 0 2rem 0',
  },
  card: {
    backgroundColor: "white",
    height: '100%',
    width: '100%',
    margin: '1rem 0 0 0',
  },
  secondRow: {
    height: '30vh',
    backgroundColor: "white",
    borderRadius: '5px',
    margin: '0.5rem',
  },
  thirdRow: {
    backgroundColor: "white",
    height: '50vh',
    borderRadius: '5px',
    margin: '0.5rem',
  },
  videoWrapper:{
    margin: '1rem 0 0 0',

  }
  
}));

export default function Content() {
  //<YoutubeTransmission videoId="splJnSIoe8I"></YoutubeTransmission>
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
          <Grid item md={6}>
            <Typography variant="h5"> Transmissão </Typography>
            <div className={classes.card}>
              {Youtube("splJnSIoe8I")}
            </div>   
          </Grid>
          <Grid item md={6}>
            <Typography variant="h5"> Plenário </Typography>
            <Paper elevation={0} className={classes.card}> </Paper>
          </Grid>
      </Grid>
      <Grid container className={classes.secondRow}>
        <Typography variant="h5" style={{margin: '1rem 0 1rem 1rem'}}> Trechos </Typography>
      </Grid>
      <Grid container className={classes.thirdRow}>
        <ExternalContentPanel></ExternalContentPanel>
      </Grid>
		</Grid>
  )
}
