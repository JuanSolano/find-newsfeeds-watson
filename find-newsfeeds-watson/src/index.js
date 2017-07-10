import React from 'react';
import ReactDOM from 'react-dom';
// SCSS
import './css/index.scss';
// JS
import Status from './js/Status';
import App from './js/App';

// APP STATUS : STATUS
ReactDOM.render(<Status />, document.getElementById('status'));

// APP RENDER : ROOT
ReactDOM.render(<App />, document.getElementById('root'));
