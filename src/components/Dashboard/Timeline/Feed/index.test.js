import React from 'react';
import { render, screen } from '@testing-library/react';
import Feed from './index';
import NewUpdate from './../NewUpdate';
import {mount,shallow} from "enzyme/build";
import ReactDOM from 'react-dom';
import MockAdapter from "axios-mock-adapter";
import axiosInstance from './../../../../auth/axiosApi';
import MockTheme from './../mockTheme';

it("snapshot should match", () => {
    const props = {
      updates: [{
        id: 1,
        content: 'test',
        time: '18:00',
      }]
    }
    const component = shallow(<Feed {...props} />);
    expect(component).toMatchSnapshot();
});


test('Test if Feed renders without crash', () => {
    const div = document.createElement("div")
    const props = {
      updates: [{
        id: 1,
        content: 'test',
        time: '18:00',
      }]
    }
    ReactDOM.render(<Feed {...props}></Feed>, div)
    ReactDOM.unmountComponentAtNode(div)
});

export const createDocumentListenersMock = () => {
  const listeners = {};
  const handler = (domEl, event) => listeners?.[event]?.({ target: domEl });
  document.addEventListener = jest.fn((event, cb) => {
    listeners[event] = cb;
  });
  document.removeEventListener = jest.fn(event => {
    delete listeners[event];
  });
  return {
    mouseDown: domEl => handler(domEl, 'mousedown'),
    click: domEl => handler(domEl, 'click'),
  };
};

describe('Test if deleting a post doesnt break page', () => {
  let mockUpdates = [{"id":56,"author":{"id":1,"is_superuser":true,"username":"admin","first_name":"","last_name":"","email":"a@a.com","profile":"editor"},"created":"2020-09-30T11:40:34.803838-03:00","state":"published","content":"{\"updateTextArea\":\"teste uol \",\"customURL\":\"https://uol.com.br\"}","tweet_id":"","image":null,"title":"","session":10,"updateTextArea":"teste uol ","customURL":"https://uol.com.br"},{"id":57,"author":{"id":1,"is_superuser":true,"username":"admin","first_name":"","last_name":"","email":"a@a.com","profile":"editor"},"created":"2020-09-30T11:42:01.887037-03:00","state":"published","content":"{\"updateTextArea\":\"post teste\",\"customURL\":\"\"}","tweet_id":"","image":null,"title":"","session":10,"updateTextArea":"post teste"}]
  let handleDeletePostMock = jest.fn()
  const fireEvent = createDocumentListenersMock();
  const wrapper = mount(<MockTheme>
                        <Feed updates={mockUpdates}
                              handleDeletePost={handleDeletePostMock}></Feed>
                        </MockTheme>);
  test('test clicking on delete button', () => {
    const moreOptionsIcon = wrapper.find('#more-options-icon').last()
    moreOptionsIcon.simulate('click');
    const deleteButton = wrapper.find('#delete-post-button').last()
    deleteButton.simulate('click');
    const timelinePost = wrapper.find('#timeline-post').last()
    timelinePost.simulate('click');
    fireEvent.mouseDown(document.body);
    })
})
