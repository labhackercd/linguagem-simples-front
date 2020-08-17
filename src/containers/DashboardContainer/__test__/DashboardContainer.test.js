import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../index.js';
import Sidebar from '../../../components/Dashboard/Sidebar';
import Timeline from '../../../components/Dashboard/Timeline';
import Content from '../../../components/Dashboard/Content';
import { Route, MemoryRouter } from 'react-router-dom'
import ShallowRenderer from 'react-test-renderer/shallow';

import {shallow} from "enzyme/build";

/* todo: implement tests with useParams() hook */
it('renders Dashboard', () => {})
