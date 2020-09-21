import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function DescriptionErrorAlert() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity="error" style={{width:"95%",height:"100%"}}>
        <AlertTitle>Erro :(</AlertTitle>
            Um erro ocorreu ao tentar obter os dados do servidor. Tente novamente mais tarde.<br></br>
            Se o problema persistir, contate os administradores.
        </Alert>
    </div>
  );
}