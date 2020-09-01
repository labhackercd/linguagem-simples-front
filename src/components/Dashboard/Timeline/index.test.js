import React from 'react';
import { render, screen } from '@testing-library/react';
import Timeline from './index';
import {shallow} from "enzyme/build";
import Header from './Header';
import StatusSelection from './StatusSelection';
import NewUpdate from './NewUpdate';
import Feed from './Feed';

it("should render the timeline section", () => {
    const component = shallow(<Timeline/>);
    expect(component).toMatchSnapshot();
});

it("Do components renders properly", () => {
    const component = shallow(<Timeline/>);
    const HeaderContent = component.find(Header);
    const StatusSelectionContent = component.find(StatusSelection);
    const NewUpdateContent = component.find(NewUpdate);
    const FeedContent = component.find(Feed);
    expect(HeaderContent.exists()).toEqual(true);
    expect(StatusSelectionContent.exists()).toEqual(true);
    expect(NewUpdateContent.exists()).toEqual(true);
    expect(FeedContent.exists()).toEqual(true);
});
