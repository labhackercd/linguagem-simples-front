import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper'
import FileCopyTwoToneIcon from '@material-ui/icons/FileCopyTwoTone';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';
import {postSaveContent, deleteSavedContent} from '../FetchFunctions/postSaveContent'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import CustomizedSnackbars from '../../../Snackbar/index'
import {uiMessages} from './../constants'

export default class NewsCard extends React.Component{
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
      this.handleDeleteContent=this.handleDeleteContent.bind(this);
    }

    showCopiedSnackBar = () => {
      this.setState({openSnackBar:true, snackbar:{open: true, message: uiMessages.clipboardCopySucess, type:"success"}})
    }

    async handleSaveContent(){
      const hasBeenSaved = await postSaveContent("news", this.state.info, this.props.sessionId);

      if(hasBeenSaved){
          this.setState({openSnackBar:true, snackbar:{open:true, message:"Conteúdo da agência salvo com sucesso!", type:"success"}});
          //this.props.updateComponent()
      }else{
          this.setState({openSnackBar:true, snackbar:{open:true, message:"Erro ao salvar conteúdo da agência!", type:"error"}});
      }
    }

    async handleDeleteContent(){

        const hasBeenDeleted = await deleteSavedContent(this.state.info.id);

        if(hasBeenDeleted){
          await this.setState({openSnackBar:true, snackbar:{open:true, message:"Conteúdo Removido!", type:"success"}});
          this.props.updateComponent(true)
        }else{
            this.setState({openSnackBar:true, snackbar:{open:true, message:"Erro ao remover conteúdo salvo!", type:"error"}});
        }
    }

    render(){
      return (
        <Box width="97%">
            <CustomizedSnackbars open={this.state.snackbar.open} message={this.state.snackbar.message} type={this.state.snackbar.type}></CustomizedSnackbars>
            <Paper elevation={0} style={{background:'#F4F4F4'}}>
                <Grid container>
                    <Grid item xs={12}>
                        <Box m={1}>
                            <Grid container>
                                <Grid item xs={10}><Typography style={{ color: "gray" }} variant="body1">Notícia</Typography></Grid>
                                <Grid item xs={2}>
                                  <Box display="flex" justifyContent="flex-end">
                                    <CopyToClipboard text={this.state.info.url}>
                                      <IconButton size="small" id={"copyButtonAgencia"+this.state.info.id}>
                                        <FileCopyTwoToneIcon text={this.state.info.url} id="file-copy" fontSize="inherit" onClick={this.showCopiedSnackBar}/>
                                      </IconButton>
                                    </CopyToClipboard>
                                    {this.state.isDataFromSavedContentsComponent ?
                                        <IconButton id={"saveButtonAgencia"+this.state.info.id} aria-label="save" size="small" onClick={this.handleSaveContent}>
                                            <BookmarkIcon fontSize="inherit" style={{ color: "#C4C4C4" }}/>
                                        </IconButton>
                                        :
                                        <Tooltip title="Deletar conteúdo">
                                          <IconButton id={"deleteSavedContent"+this.state.info.id} aria-label="delete" size="small" onClick={this.handleDeleteContent}>
                                            <DeleteOutlineOutlinedIcon fontSize="inherit" />
                                          </IconButton>
                                        </Tooltip>
                                    }
                                  </Box>
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
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
      );
    }

  }
