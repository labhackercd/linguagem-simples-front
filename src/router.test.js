import React from 'react'
import {render} from '@testing-library/react';
import ReactDOM from 'react-dom'
import AppRouter from './router.js'
import renderer from 'react-test-renderer';



test('Test if AppRouter renders without crash', () => {
    const div = document.createElement("div")
    ReactDOM.render(<AppRouter></AppRouter>, div)
    ReactDOM.unmountComponentAtNode(div)
});
