import React from 'react';
import {shallow} from "enzyme/build";
import { mount} from 'enzyme';
import MockAdapter from "axios-mock-adapter"
import CircularProgress from '@material-ui/core/CircularProgress';
import AttendanceListAlphabetic from '../attendanceListAlphabetic'
import CongressPersonLine from '../congressPersonLine'
import {mockPresenceList} from './assets/mockdata'

describe('Testing AttendanceListAlphabetic Card', () => {

    it("should render the AttendanceListAlphabetic component and match snapshot ", () => {


      const component = mount(<AttendanceListAlphabetic plenaryAttendanceList={mockPresenceList}/>);
  
      expect(component.exists()).toEqual(true);
      expect(component).toMatchSnapshot();
    });
  
  
  });
  
