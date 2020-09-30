import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import moment from 'moment';
import {postSaveContent, deleteSavedContent} from '../FetchFunctions/postSaveContent'
import TVIcon from './assets/tv_image.svg'
import CustomizedSnackbars from '../../../Snackbar/index'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import FileCopyTwoToneIcon from '@material-ui/icons/FileCopyTwoTone';
import {uiMessages} from './../constants'


export default class TVCard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        info : {
          id:this.props.info.id,
          url:this.props.info.url,
          titulo:this.props.info.titulo===undefined ? this.props.info.title : this.props.info.titulo,
          data:this.props.info.data===undefined ? this.props.info.created : this.props.info.data
        },
        isDataFromSavedContentsComponent : this.props.info.titulo===undefined ? false : true,
        snackbar:{
          open:false,
          message:"",
          type:""
        }
    };
    this.handleSaveContent=this.handleSaveContent.bind(this);
  }


  async handleSaveContent(){
    const hasBeenSaved = await postSaveContent("tv", this.state.info, this.props.sessionId);

    if(hasBeenSaved){
        this.setState({openSnackBar:true, snackbar:{open:true, message:"Conteúdo da TV salvo com sucesso!", type:"success"}});
    }else{
        this.setState({openSnackBar:true, snackbar:{open:true, message:"Erro ao salvar conteúdo da TV!", type:"error"}});
    }
  }

  showCopiedSnackBar = () => {
    this.setState({openSnackBar:true, snackbar:{open: true, message: uiMessages.clipboardCopySucess, type:"success"}})
  }

  render(){
    return (
      <Box width="97%" height="100%" >
        <CustomizedSnackbars open={this.state.snackbar.open} message={this.state.snackbar.message} type={this.state.snackbar.type}></CustomizedSnackbars>
        <Paper elevation={0} style={{background:'#F4F4F4'}}>
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
                              <CopyToClipboard text={this.state.info.url}>
                                <IconButton size="small">
                                <FileCopyTwoToneIcon text={this.state.info.url}
                                                     fontSize="inherit"
                                                    onClick={this.showCopiedSnackBar}/>                                </IconButton>
                              </CopyToClipboard>

                              {this.state.isDataFromSavedContentsComponent &&
                                  <IconButton id={"saveButtonTv"+this.state.info.id} aria-label="delete" size="small" onClick={this.handleSaveContent}>
                                  <BookmarkIcon fontSize="inherit"  style={{ color: "#00AF82" }} />
                                  </IconButton>
                                }
                            </Grid>
                            <Grid item xs={12}>
                              <Box fontWeight="fontWeightRegular">
                                <a rel={'external noopener noreferrer'} target="_blank" href={"https://"+this.state.info.url} style={{textDecoration: "none"}}>
                                    <Typography variant="h6" style={{ color: "#007E5A" }}>
                                        {this.state.info.titulo}
                                    </Typography>
                                  </a>
                              </Box>
                            </Grid>
                            <Grid item xs={12}>
                              <Box fontSize={11}>
                                <Typography style={{ color: "gray" }}>
                                    {moment(new Date(this.state.info.data)).format("DD/MM/YYYY HH:mm")}
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

}
