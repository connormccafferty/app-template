import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import App from './App';

const init = async () => {
  openDevTools()
}

ReactDOM.render(<App />, document.getElementById('root'));

init();

function openDevTools() {
  const { identity } = fin.Window.getCurrentSync();
  fin.System.showDeveloperTools(identity);
}