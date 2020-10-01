import React from 'react';
import { render, screen } from '@testing-library/react';
import PreviewDialog from './index';
import {shallow, mount} from "enzyme/build";

it("should render the Preview Dialog", () => {
    const props = {
      tweetID: '1300777342864953345'
    }
    const component = shallow(<PreviewDialog {...props} />);
    expect(component.exists()).toEqual(true);
    expect(component).toMatchSnapshot();
});

it('should not break on textual update', () => {
  const wrapper = mount(<PreviewDialog previewModalOpen={true}
        handleDialogStateAction={jest.fn()}
        handleChange={jest.fn()}
        broadcastingOnline={true} />);
  const textfield = wrapper.find('#textfield-preview-dialog').last()
  const submitButton = wrapper.find('#button-preview-click').last()
  const exitDialog = wrapper.find('#close-preview-dialog').last()
  const removeTitle = wrapper.find('#remove-post-title').last()
  textfield.instance().value = "testing textfield"
  textfield.simulate('change')
  submitButton.simulate('click')
  exitDialog.simulate('click')
})

  it('should not break on twitter update', () => {
    const wrapper = mount(<PreviewDialog previewModalOpen={true}
          handleDialogStateAction={jest.fn()}
          handleChange={jest.fn()}
          broadcastingOnline={true}
          tweetID={'1300777342864953345'}
          URLInputIsTwitter={true} />);
    const textfield = wrapper.find('#textfield-preview-dialog').last()
    const submitButton = wrapper.find('#button-preview-click').last()
    textfield.instance().value = "testing textfield"
    textfield.simulate('change')
    submitButton.simulate('click')
})
