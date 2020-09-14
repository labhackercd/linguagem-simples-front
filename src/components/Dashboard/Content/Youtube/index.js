import React from 'react';
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography' 

export default function Youtube(sessionIdDadosAbertos){
  const youtubeId = "stgBjJwcnIw";
  if(sessionIdDadosAbertos===null){
    return (
      <Box width="100%" height="100%" display="flex" alignContent="center" justifyContent="center">
        <Typography variant="h5" style={{ color: "grey" }}> Transmissão não disponível</Typography>
      </Box>
    )
  }

  return (
    <div
      className="video"
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
        src={`https://www.youtube.com/embed/${youtubeId}`}
        frameBorder="0"
        title="Trasmissão da Sessão Plenária"
      />
    </div>
  );
};