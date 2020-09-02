import React from 'react';
import { render, screen } from '@testing-library/react';
import Content from './index';
import {shallow} from "enzyme/build";
import Youtube from './youtubeTransmission'
import ExternalContentPanel from './externalContentPanel'

it("should render the content section", () => {
    const component = shallow(<ExternalContentPanel/>);
    expect(component).toMatchSnapshot();
});

it("should render the external content section", () => {
    const component = shallow(<Content/>);
    expect(component).toMatchSnapshot();
});


it("should return iframe of youtube content section", () => {
    const sessionID = 1;
    const youtubeVideo = Youtube(sessionID);
    expect(youtubeVideo.props.className).toBe("video")
});


