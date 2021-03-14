import React from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader/root';
import App from './App';

const Hot = hot(App);

render(<Hot />, document.getElementById('root'));
