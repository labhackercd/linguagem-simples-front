import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress';
import {lista_glossario} from './glossarioData'
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import { FixedSizeList } from 'react-window';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';



const useStyles = makeStyles((theme) => ({
    body: {
      padding: '1rem',
      height: '100%',
      overflow: 'auto',
    },
    termGlossarioCard:{
      background:'#F4F4F4',
    },
}));

const dialogStyles = (theme) => ({
  root: {
    margin: 0,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(dialogStyles)((props) => {

  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

function GlossarioTermCard(props){
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Box width="97%" marginTop={0.5}>   
          <Paper elevation={0} className={classes.termGlossarioCard}>
            <Grid container>
              <ButtonBase  onClick={handleOpen} style={{width: "100%", textAlign: "left" }}>
                <Grid item xs={12}>
                    <Box m={1}><Typography style={{ color: "gray" }}>{props.data.termo}</Typography></Box>
                </Grid>
              </ButtonBase>
            </Grid>
          </Paper>
          <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <Paper style={{backgroundColor:"#F2F2F2"}}>
              <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                <Typography style={{ color: "gray" }}>{props.data.termo}</Typography>
              </DialogTitle>
              <MuiDialogContent style={{paddingTop:"2px"}}>
                <Paper elevation={0} borderRadius={10}>
                  <Box padding={1} >
                    <Typography gutterBottom variant="body1" align="justify">
                      {props.data.descricao}
                    </Typography>
                  </Box>
                </Paper>
              </MuiDialogContent>
            </Paper>
          </Dialog>
      </Box>
  );
}


export default class GlossarioContent extends React.Component {
    
  constructor(props){
    super(props);
    this.state = { 
        glossario: lista_glossario,
        filteredGlossario: lista_glossario,
        dataLoaded: false,
        searchField: ''
    };
  }

  renderSearchBarFunction(){
    return(
      <React.Fragment>
        <Grid item xs={8}>
          <Typography variant="h6" style={{ color: "#007E5A" }}>A - Z </Typography>
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="input-search-glossario"
            size="small"
            onChange={this.glossarioFilterOnChange}
            InputProps={{
              endAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>),
            }}/>
        </Grid>
      </React.Fragment>
    )
  }


  fetchGlossaryList = async term => {
    try {
      this.setState({dataLoaded:true});

    } catch (error) {
        throw error;
    }
  };

  renderListItem = ({index, style}) => {
    return(
      <ListItem  style={style} >   
        <GlossarioTermCard data={this.state.filteredGlossario[index]}></GlossarioTermCard>
      </ListItem>
    )
  }

  componentDidMount(){
      this._isMounted = true;

      if(this._isMounted){
          this.fetchGlossaryList();
      }
  }


  glossarioFilterOnChange = (event) => {
    console.log(event.target.value)
    this.setState({
      searchField: event.target.value
    })
    this.setState({
      filteredGlossario: this.state.glossario.filter(term => term.termo.toLowerCase().includes(this.state.searchField.toLowerCase()))
    })
  }

  render(){
    if(!this.state.dataLoaded){
      return (<Box display="flex" justifyContent="center" alignItems="center"><CircularProgress></CircularProgress></Box>)
    }

    return (
      <div>
        <Grid container>
          {this.renderSearchBarFunction()}
          <Grid item xs={12}>
            <Box paddingTop={3}>
              <FixedSizeList height={250} itemSize={40} itemCount={this.state.filteredGlossario.length}>        
                {this.renderListItem}
              </FixedSizeList>
            </Box>
          </Grid>
        </Grid>
      </div>
    )
  }
}