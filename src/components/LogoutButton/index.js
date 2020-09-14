import axiosInstance from './../../auth/axiosApi.js'
import React from 'react';

import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    inputTextColor:{
        color:'white',
      },
    label: {
    textTransform: 'capitalize',
    }
  });



export default function LogoutButton() {
    const classes = useStyles();

    function handleLogout() {
        try {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            axiosInstance.defaults.headers['Authorization'] = null;
        }
        catch (e) {
            //console.log(e);
        }
    };

    return (
        <Button
        onClick={() => { handleLogout() }}
        classes={{
            root: classes.inputTextColor, // class name, e.g. `classes-nesting-root-x`
            label: classes.label, // class name, e.g. `classes-nesting-label-x`
          }}
          href="/"
        >
        sair
        </Button>
    );
  }
