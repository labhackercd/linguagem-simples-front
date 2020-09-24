import React from "react";
import { Grid } from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import AgendaOfTheDayComponent from './AgendaOfTheDay/index'
import PlenaryAttendance from './PlenaryAttendance/index'
import PlenaryVoting from './PlenaryVoting/index'


const styles = (theme) => ({
  tab:{
      [theme.breakpoints.up(500)]: {
          minWidth: '0px',
          paddingLeft: '2px',
          paddingRight: '5px'
      }
  },
  bigIndicator: {
      height: 0
  },
  default_tabStyle: {
      backgroundColor: "#F2F2F2",
      color:"666666",
      textTransform: "none",
  },
  active_tabStyle: {
      backgroundColor: "#007E5A",
      borderRadius: 5,
      color:"white",
      textTransform: "none"
  }
});




class PlenaryPanel extends React.Component {

  constructor(props){
    super(props);
    this.state = { 
      value: 0,
    };
    this.handleChange=this.handleChange.bind(this);
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return [
      <div>
        <Tabs
          variant="standart"
          classes={{ root: classes.tab, selected: classes.tabSelected, labelContainer: classes.labelContainer,indicator: classes.bigIndicator  }}
          value={value}
          onChange={this.handleChange}
        >
          <Tab
            classes={{ root: classes.tab}}
            label={
              <React.Fragment>
                <Button
                  variant="contained"
                  size="small"
                  classes={{ root: classes.tab}}
                  className={
                    this.state.value === 0
                      ? classes.active_tabStyle
                      : classes.default_tabStyle
                  }
                >
                  Pauta do Dia
                </Button>
              </React.Fragment>
            }
          />
          <Tab
            classes={{ root: classes.tab}}
            label={
              <React.Fragment>
                <Button
                  variant="contained"
                  size="small"
                  className={
                    this.state.value === 1
                      ? classes.active_tabStyle
                      : classes.default_tabStyle
                  }
                >
                  Presença
                </Button>
              </React.Fragment>
            }
          />
          <Tab
            classes={{ root: classes.tab}}
            label={
              <React.Fragment>
                <Button
                  variant="contained"
                  size="small"
                  className={
                    this.state.value === 2
                      ? classes.active_tabStyle
                      : classes.default_tabStyle
                  }
                >
                  Votação
                </Button>
              </React.Fragment>
            }
          />
        </Tabs>
      </div>,
      <div key="tab-content">
        {value === 0 && <AgendaOfTheDayComponent sessionIdDadosAbertos={this.props.sessionIdDadosAbertos}></AgendaOfTheDayComponent>}
        {value === 1 && <PlenaryAttendance sessionIdDadosAbertos={this.props.sessionIdDadosAbertos}></PlenaryAttendance>}
        {value === 2 && <PlenaryVoting sessionIdDadosAbertos={this.props.sessionIdDadosAbertos}></PlenaryVoting>}
      </div>
    ];
  }
}

PlenaryPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PlenaryPanel);
