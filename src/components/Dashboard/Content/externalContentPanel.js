import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  body: {
    padding: '1rem',
    height: '100%',
    overflow: 'auto',
  },
  menu: {
    padding: '0.1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  button: {
    margin: '0.1rem 0',
    width: '100%',
    height: '100% !important',
    color: 'white',
    '&:focus, &.Mui-focusVisible': {
      backgroundColor: '#007E5A',
      color: "white",
    },
  },
  content: {
    padding: '1rem',
  }
}));

const MenuButton = withStyles((theme) => ({
  root: {
    color: "#666666",
    backgroundColor: "#F9F9F9",
    textTransform: 'none',
    '&:focus': {
      backgroundColor: '#007E5A',
      color: "white",
    },
  },
}))(Button);

export default function ExternalContentPanel() {
  const classes = useStyles();
  return (
    <Grid container className={classes.body}>
      <Grid item md={4} className={classes.menu}>
        <MenuButton
          variant="contained"
          size="large"
          className={classes.button}
          startIcon={<img src="../../img/flag_icon.svg" alt="flag icon"/>}
          disableElevation
          >
          <Typography variant="body1">Conteúdos salvos</Typography>
        </MenuButton>
        <MenuButton
          variant="contained"
          size="large"
          className={classes.button}
          startIcon={<img src="../../img/paper_sheet_icon.svg" alt="paper sheet icon"/>}
          disableElevation
          >
          <Typography variant="body1">Agência Câmara</Typography>
        </MenuButton>
        <MenuButton
          variant="contained"
          color="default"
          size="large"
          className={classes.button}
          startIcon={<img src="../../img/tv_icon.svg" alt="tv icon"/>}
          disableElevation
          >
          <Typography variant="body1"> Tv Câmara </Typography>
        </MenuButton>
        <MenuButton
          variant="contained"
          color="default"
          size="large"
          className={classes.button}
          startIcon={<img src="../../img/radio_icon.svg" alt="radio icon"/>}
          disableElevation
          >
          <Typography variant="body1">Rádio Câmara</Typography>
        </MenuButton>
        <MenuButton
          variant="contained"
          color="default"
          size="large"
          className={classes.button}
          startIcon={<img src="../../img/twitter_icon.svg" alt="twitter icon"/>}
          disableElevation
          >
          <Typography variant="body1">Twitter</Typography>
        </MenuButton>
        <MenuButton
          variant="contained"
          size="large"
          className={classes.button}
          startIcon={<img src="../../img/glossary_icon.svg" alt="glossary icon"/>}
          disableElevation
          >
          <Typography variant="body1">Glossário</Typography>
        </MenuButton>
      </Grid>
      <Grid item md={8} className={classes.content}>
      </Grid>
    </Grid>
  )
}
