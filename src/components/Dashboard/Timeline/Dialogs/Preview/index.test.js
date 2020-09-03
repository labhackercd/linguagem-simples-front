import React from 'react';
import { render, screen } from '@testing-library/react';
import PreviewDialog from './index';
import {shallow} from "enzyme/build";

it("should render the Preview Dialog", () => {
    const props = {
      tweetID: '1300777342864953345'
    }
    const component = shallow(<PreviewDialog {...props} />);
    expect(component.exists()).toEqual(true);
    expect(component).toMatchSnapshot();
});
