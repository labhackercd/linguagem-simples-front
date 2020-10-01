import React from 'react';
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography' 

import getYoutubeVideoUrl from './fetchYoutubeVideoUrl'

export default class Youtube extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
        youtubeVideoId: null,
        sessionIdDadosAbertos: this.props.sessionIdDadosAbertos
    };
  }
  

  fetchYoutubeVideo = async term => {

    var data = null;
    //console.log(this.state.sessionIdDadosAbertos)
    if(this.state.sessionIdDadosAbertos !== undefined){
      //console.log(this.state.sessionIdDadosAbertos)
      data = await getYoutubeVideoUrl(this.state.sessionIdDadosAbertos);
      //This split is necessary because we need just the ID of video, since we need 
      //to use the tag embed in the url instead of the watch returned at API
      this.setState({youtubeVideoId:(data.split('?v=').pop())}) 
      this.setState({dataLoaded:true});
    }else{
      //Nothing to do
      //console.log("entrou no loop")
    }


  };

  componentDidMount(){
    this._isMounted = true;
    if(this._isMounted){
        console.log(this.props)
        this.fetchYoutubeVideo();
    }
  }

  render(){
    if(this.props.sessionIdDadosAbertos===null || this.state.youtubeVideoId === null){
      return (
        <Box width={1} height={1}>
          <Box display="flex" justifyContent="center" alignItems="center" width={"100%"} height={"100%"}>
            <Typography variant="h5" style={{color: "#C4C4C4"}}>Transmissão não disponível</Typography>
          </Box>
        </Box>
      )
    }

    return (
      <div
        className="video"
        id={"transmissaoYoutube"+this.state.youtubeVideoId}
        style={{
          position: "relative",
          paddingBottom: "56.25%" /* 16:9 */,
          paddingTop: 0,
          height: 0
        }}
      >
        <iframe
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
          }}
          src={`https://www.youtube.com/embed/${this.state.youtubeVideoId}`}
          frameBorder="0"
          title="Trasmissão da Sessão Plenária"
        />
      </div>
    );
  }
}
