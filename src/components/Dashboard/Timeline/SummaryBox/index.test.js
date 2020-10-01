import React from 'react';
import { render, screen } from '@testing-library/react';
import SummaryBox from './index';
import {shallow, mount} from "enzyme/build";
import ReactDOM from 'react-dom';

it("snapshot should not have differences", () => {
    const component = shallow(<SummaryBox/>);
    expect(component).toMatchSnapshot();
});

test('Test if SummaryBox renders without crash', () => {
    const div = document.createElement("div")
    ReactDOM.render(<SummaryBox></SummaryBox>, div)
    ReactDOM.unmountComponentAtNode(div)
});


test('does "resumo" label gets rendered', () => {
    const { getByText } = render(<SummaryBox />);
    const textAreaLabel = getByText('Resumo');
    expect(textAreaLabel).toBeInTheDocument();
});

test('click on update button doesnt break page', () => {
  const wrapper = mount(<SummaryBox sessionId={1} broadcastingOnline={true} />);
  const submitButton = wrapper.find('#summary-box-submit-button').last()
  const textfield = wrapper.find('#summary-box-textfield').last()
  textfield.instance().value = "test content"
  textfield.simulate("change");
  submitButton.simulate('click')
})
