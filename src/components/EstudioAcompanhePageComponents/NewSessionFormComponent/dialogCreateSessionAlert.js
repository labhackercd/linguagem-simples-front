import React, { useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography'
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CreateSession from './assets/creating_session.svg'
import Box from '@material-ui/core/Box'

export default function CreatingSessionDialog(props) {
  const [open, setOpen] = React.useState(props.open);
  

  useEffect(() => setOpen(props.open), [props.open]);

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >

        <DialogContent>
          <Box display="flex" justifyContent="center">
            <img src={CreateSession} alt="Imagem criando sessão"></img>
          </Box>
          
     
            <Box m={1}>
              <Typography align="center">Criando Sessão</Typography>
              <Typography align="justify">Aguarde enquanto a sessão é criada</Typography>
            </Box>

        </DialogContent>
      </Dialog>
    </div>
  );
}