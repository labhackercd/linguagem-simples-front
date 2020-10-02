import React from 'react';
import { render, screen } from '@testing-library/react';
import NewsCard from './../newsCard';
import {shallow, mount} from "enzyme/build";
import ReactDOM from 'react-dom';

it("should not break when clicking on copy and paste icon", () => {
    const wrapper = mount(<NewsCard info={{id: 1, url: 'http://test.com', titulo: 'title', data: '1/1/1', }}/>);
    const button = wrapper.find('#file-copy').last()
    jest.mock('copy-to-clipboard', () => {
      return jest.fn();
    });
    button.simulate('click')
});
