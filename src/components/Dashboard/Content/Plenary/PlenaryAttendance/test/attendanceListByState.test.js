import React from 'react';
import {shallow} from "enzyme/build";
import { mount} from 'enzyme';
import MockAdapter from "axios-mock-adapter"
import CircularProgress from '@material-ui/core/CircularProgress';
import AttendanceListByState from '../attendaceListByState'
import CongressPersonLine from '../congressPersonLine'
import {mockPresenceList} from './assets/mockdata'

describe('Testing AttendanceListByState Card', () => {

    it("should render the AttendanceListByState component and match snapshot ", () => {


      const component = mount(<AttendanceListByState plenaryAttendanceList={mockPresenceList}/>);
  
      expect(component.exists()).toEqual(true);
      expect(component).toMatchSnapshot();
    });
  
  
  });
  
