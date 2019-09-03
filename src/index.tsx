import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import App from './App';

// const init = async () => {}

ReactDOM.render(<App />, document.getElementById('root'));

if (typeof fin !== 'undefined') {
  openDevTools();
}

function openDevTools() {
  const { identity } = fin.Window.getCurrentSync();
  fin.System.showDeveloperTools(identity);
}