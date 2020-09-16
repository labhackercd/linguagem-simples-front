import React from 'react';
import {shallow} from "enzyme/build";
import { mount} from 'enzyme';
import MockAdapter from "axios-mock-adapter"
import axiosInstance from '../../../../../auth/axiosApi'
import CircularProgress from '@material-ui/core/CircularProgress';
import TwitterCard from '../twitterCard'

describe('Testing News Card', () => {

    it("should render the TwitterCard component and match snapshot ", () => {
      var mockedPropsdata={
        "nome": "ADRIANO DO BALDY",
        "partido": "PP",
        "uf": "GO",
        "twitter": "twitter.com/adrianodobaldy"
      }

      const component = mount(<TwitterCard data={mockedPropsdata}/>);
  
      expect(component.exists()).toEqual(true);
      expect(component).toMatchSnapshot();
    });

});  