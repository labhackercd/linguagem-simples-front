import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import moment from 'moment';
import postSaveContent from '../FetchFunctions/postSaveContent'

const useStyles = makeStyles((theme) => ({
      newsCard:{
        background:'#F4F4F4',
      },
}));

export default function NewsCard(props){
    const classes = useStyles();
    
    async function handleSaveContent(){
        const hasBeenSaved = await postSaveContent("news", props.info, props.sessionId);

        if(hasBeenSaved){
            //console.log("Conteúdo salvo")
        }else{
            //console.log("Conteúdo não salvo")
        }
    }
  
    return (
        <Box width="97%" >
            <Paper elevation={0} className={classes.newsCard}>
                <Grid container>
                    <Grid item xs={12}>
                        <Box m={1}>
                            <Grid container>
                                <Grid item xs={10}>
                                    <Typography style={{ color: "gray" }} variant="body1">Notícia</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Box display="flex" justifyContent="flex-end">
                                        <IconButton aria-label="delete" className={classes.margin} size="small">
                                            <AddCircleOutlineIcon fontSize="inherit" />
                                        </IconButton>
                                            
                                        <IconButton id={"saveButton"+props.info.id} aria-label="delete" className={classes.margin} size="small" onClick={handleSaveContent}>
                                            <BookmarkIcon fontSize="inherit"  style={{ color: "#00AF82" }} /> 
                                        </IconButton>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                  <Box fontWeight="fontWeightRegular">
                                  <a rel={'external noopener noreferrer'} target="_blank" href={"https://"+props.info.url} style={{textDecoration: "none"}}>
                                      <Typography variant="h6" style={{ color: "#007E5A" }}>
                                          {props.info.titulo}
                                      </Typography>
                                    </a>
                                  </Box>
                                </Grid>
                                <Grid item xs={12}>
                                  <Box fontSize={11}>
                                    <Typography style={{ color: "gray" }}>
                                         {moment(new Date(props.info.data)).format("DD/MM/YYYY HH:mm")}
                                    </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}