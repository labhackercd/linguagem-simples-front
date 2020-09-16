import React,{useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

//Update acording to severity of error make a switch case
export default function CustomizedSnackbars(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState({...props.open});


  const handleClose = (event, reason) => {
    /*
    if (reason === 'clickaway') {
      return;
    }*/

    setOpen(false);
  };

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);


  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  function handleAlert(type,message){
    switch(type) {
      case 'success':
        return <Alert onClose={handleClose} severity={type}>{message}</Alert>;
      case 'error':
        return <Alert onClose={handleClose} severity={type}>{message}</Alert>;
      default:
        return null;
    }
  }

  return (
    <div className={classes.root}>
      <Snackbar open={Boolean(open)} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} bodystyle={{ maxWidth: '100%', height: 'auto' }}>
        {handleAlert(props.type, props.message)}  
      </Snackbar>
    </div>
  );
}