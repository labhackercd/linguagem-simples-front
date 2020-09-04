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
import TVIcon from './assets/tv_image.svg'

const useStyles = makeStyles((theme) => ({
      tvCard:{
        background:'#F4F4F4',
      }
}));

export default function TVCard(props){
    const classes = useStyles();

    // The ternary is necessary to get correctly data from different endpoints and still use the same component
    const info = {
      id:props.info.id,
      url:props.info.url,
      titulo:props.info.titulo===undefined ? props.info.title : props.info.titulo,
      data:props.info.data===undefined ? props.info.created : props.info.data
    }
    const isDataFromSavedContentsComponent = props.info.titulo===undefined ? false : true;

    async function handleSaveContent(){
        const hasBeenSaved = await postSaveContent("tv", info, props.sessionId);

        if(hasBeenSaved){
            //console.log("Conteúdo da TV salvo")
        }else{
            //console.log("Conteúdo da TV não salvo")
        }
    }

    return (
      <Box width="97%" height="100%" >
          <Paper elevation={0} className={classes.tvCard}>
              <Grid container>
                  <Grid item xs={12}>
                      <Box my={1} mr={1}>
                        <Grid container  alignItems="center" justify="center">
                          <Grid item xs={2} align="center">                         
                            <img src={TVIcon} alt="Ícone de Televisão"></img>  
                          </Grid>
                          <Grid item xs={10}>
                            <Grid container>
                              <Grid item xs={11}>
                                <Typography style={{ color: "gray" }} variant="body1">Vídeo</Typography>
                              </Grid>
                              <Grid item xs={1}>
                                <IconButton aria-label="delete" className={classes.margin} size="small">
                                    <AddCircleOutlineIcon fontSize="inherit" />
                                </IconButton>
                                          
                                {isDataFromSavedContentsComponent &&
                                    <IconButton id={"saveButtonTv"+info.id} aria-label="delete" className={classes.margin} size="small" onClick={handleSaveContent}>
                                    <BookmarkIcon fontSize="inherit"  style={{ color: "#00AF82" }} /> 
                                    </IconButton>   
                                  }
                              </Grid>
                              <Grid item xs={12}>
                                <Box fontWeight="fontWeightRegular">
                                   <a rel={'external noopener noreferrer'} target="_blank" href={"https://"+info.url} style={{textDecoration: "none"}}>
                                      <Typography variant="h6" style={{ color: "#007E5A" }}>
                                          {info.titulo}
                                      </Typography>
                                    </a>
                                </Box>
                              </Grid>
                              <Grid item xs={12}>
                                <Box fontSize={11}>
                                  <Typography style={{ color: "gray" }}>
                                      {moment(new Date(info.data)).format("DD/MM/YYYY HH:mm")}
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Box>
                  </Grid>
              </Grid>
          </Paper>
      </Box>
  );
}
