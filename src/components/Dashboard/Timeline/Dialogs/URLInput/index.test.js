import React from 'react';
import { render, screen } from '@testing-library/react';
import {shallow, mount} from "enzyme/build";
import ReactDOM from "react-dom";
import URLInputDialog from './index.js';

it("snapshot should not have differences", () => {
    const component = shallow(<URLInputDialog URLInputDialogOpen={true}/>);
    expect(component.exists()).toEqual(true);
    expect(component).toMatchSnapshot();
});

test('Test if Feed renders without crash', () => {
    const div = document.createElement("div")
    ReactDOM.render(<URLInputDialog URLInputDialogOpen={true} />, div)
    ReactDOM.unmountComponentAtNode(div)
});

test('Clicking on buttons doesnt break page', () => {
  const wrapper = mount(<URLInputDialog URLInputDialogOpen={true}
                                        setCustomURL={jest.fn()}
                                        customURL="testURL"
                                        handleDialogStateAction={jest.fn()}/>)
  const textfield = wrapper.find('#url-input').last()
  textfield.instance().value = "test text"
  textfield.simulate('change')
  const submitButton = wrapper.find('#submit-button').last()
  submitButton.simulate('click')
  const deleteButton = wrapper.find('#cancel-button').last()
  deleteButton.simulate('click')
})
