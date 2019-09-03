import React from 'react';

const App: React.FC = () => {
  const [version, setVersion] = React.useState('');

  React.useEffect(() => {
    async function ofVersion() {
      let ofVersion = await fin.System.getVersion();
      setVersion(ofVersion);
    }

    ofVersion();
  }, []);

  return (
    <div className="App">
      <h1>Hello, world!</h1>
      <p>This is a template for an OpenFin application.</p>
        <p id="version-number-container">
            Current version: <span id="of-version">{version || 'The fin API is not available - you are probably running in a browser.'}</span>
        </p>
    </div>
  )
}

export default App;

