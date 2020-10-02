import axiosInstance from './../../auth/axiosApi.js'
import React from 'react';

import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import handleLogout from './handleLogout.js'
import { ReactComponent as LogoutIcon } from './assets/logout_icon.svg';
import SvgIcon from '@material-ui/core/SvgIcon'
import {INITIAL_PAGE_URL} from '../../api_urls'

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

    return (
        <Button
          onClick={() => { handleLogout() }}
          classes={{
              root: classes.inputTextColor, // class name, e.g. `classes-nesting-root-x`
              label: classes.label, // class name, e.g. `classes-nesting-label-x`
            }}
          href={INITIAL_PAGE_URL}
          endIcon={<LogoutIcon />}
          >
        sair
      </Button>
    );
  }
