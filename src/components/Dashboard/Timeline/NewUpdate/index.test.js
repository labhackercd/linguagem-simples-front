import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewUpdate from './index';
import {shallow, mount } from "enzyme/build";
import ReactDOM from 'react-dom';
import MockTheme from './../mockTheme';

it("snapshot should not have differences", () => {
    const component = shallow(<MockTheme><NewUpdate date={new Date(98, 1)}/></MockTheme>);
    expect(component.exists()).toEqual(true);
    expect(component).toMatchSnapshot();
});

test('Test if NewUpdate renders without crash', () => {
    const div = document.createElement("div")
    ReactDOM.render(<MockTheme><NewUpdate></NewUpdate></MockTheme>, div)
    ReactDOM.unmountComponentAtNode(div)
});

test('writes update and submit doesnt break page', () => {
    const wrapper = mount(<MockTheme>
                          <NewUpdate handleDialogStateAction={jest.fn()}/>
                          </MockTheme>);
    const button = wrapper.find("#updateSubmitButton").last();
    const textField = wrapper.find("#newUpdateTextField").last();
    textField.instance().value = "test content"
    textField.simulate("change");
    button.simulate('click');
    wrapper.unmount();
});

test('clicking content insertion icons doesnt break page', () => {
  const wrapper = mount(<MockTheme><NewUpdate handleDialogStateAction={jest.fn()}/></MockTheme>);
  const imageInsert = wrapper.find('#picture-upload-icon').last()
  const twitterInsert = wrapper.find('#tweet-insert-icon').last()
  const linkInsert = wrapper.find('#link-insert-icon').last()
  imageInsert.simulate('click')
  twitterInsert.simulate('click')
  linkInsert.simulate('click')
})
