import React from 'react';
import { Grid, Typography, Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  body: {
    padding: '0 1.5rem 0 1.5rem',
  },
  header: {
    margin: '1rem 0 0 0',
    height: '10vh',
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
  plenary: {
    backgroundColor: "white",
    height: '100%',
    width: '100%',
  },
  firstRow: {
    height: '100%',
    margin: '0 0 2rem 0',
  },
  secondRow: {
    height: '30vh',
    backgroundColor: "white",
    borderRadius: '5px',
    margin: '1rem 0 1rem 0',
  },
  thirdRow: {
    backgroundColor: "white",
    height: '50vh',
    borderRadius: '5px',
    margin: '0 0 1rem 0',
  }
}));

export default function Content() {
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
        <Typography variant="h5" style={{margin: '0 0 1rem 0'}}> Transmissão </Typography>
          <Paper elevation={0} className={classes.plenary}>
          <img src="../../img/video_placeholder.png" style={{maxHeight: "110%", maxWidth: '100%'}} />
          </Paper>
        </Grid>
        <Grid item md={6}>
          <Typography variant="h5" style={{margin: '0 0 1rem 0'}}> Plenário </Typography>
          <Paper elevation={0} className={classes.plenary}> </Paper>
        </Grid>
        </Grid>
      <Grid container className={classes.secondRow}>
        <Typography variant="h5" style={{margin: '1rem 0 1rem 1rem'}}> Trechos </Typography>
      </Grid>
      <Grid container className={classes.thirdRow}>
      </Grid>
		</Grid>
  )
}
