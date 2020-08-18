import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import BookmarkIcon from '@material-ui/icons/Bookmark';

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
    },
    root: {
      flexGrow: 1,
      backgroundColor: '#007E5A',
      display: 'flex',
      height: 224,
    },
    tabs: {
      borderRight: `2px solid ${theme.palette.divider}`,
    },
    tabIndicator: {
      backgroundColor: '#007E5A',
    },
    root2: {
        background:'#007E5A',
        border: 0,
        height: '100%',
        width: '100%',
        position: "fixed",
        display: "flex"
      },
      sessionList:{
        overflow: 'auto',
        maxHeight: 350,
        maxWidth: '100%'
      },
      input:{
          color: "green"
      },
      newsCard:{
        background:'#F4F4F4',
      },
  }));
  
function NewsCard(props){
    const classes = useStyles();

    return (
        <Box width="95%" >
            <Paper elevation={0} className={classes.newsCard}>
                <Grid container>
                    <Grid item xs={12}>
                        <Box m={1}>
                            <Grid container>
                                <Grid item xs={10}>
                                    <Typography style={{ color: "gray" }} variant="body">Notícia</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                        <Box display="flex" justifyContent="flex-end">
                                        <IconButton aria-label="delete" className={classes.margin} size="small">
                                            <AddCircleOutlineIcon fontSize="inherit" />
                                            <BookmarkIcon fontSize="inherit"  style={{ color: "#00AF82" }} /> 
                                        </IconButton>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6" style={{ color: "#007E5A" }}>
                                        <Box fontWeight="fontWeightRegular" >{props.title}</Box>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography style={{ color: "gray" }}>
                                        <Box fontSize={11} >{props.dateAndHour}</Box>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}


export default function AgenciaCamaraContent() {
    const classes = useStyles();
    const newsList = [0, 1, 2, 3,4]

    return (
        <div>
            <List style={{maxHeight: '200px', overflow: 'auto'}}>            
                {newsList.map((sectionId) => (
                    <li key={`section-${sectionId}`}>
                        <Box my={0.5}><NewsCard></NewsCard></Box>
                    </li>
                ))}
            </List>

        </div>
    )
  }
  