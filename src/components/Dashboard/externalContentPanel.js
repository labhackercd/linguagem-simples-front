import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  body: {
    padding: '0 1.5rem 0 1.5rem',
  },
}));

export default function ExternalContentPanel() {
  const classes = useStyles();
  return (
    <h1> oh yeah </h1>
  )
}
