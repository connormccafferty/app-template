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

  async function handleClick() {
    await fin.Window.create({
      name: `child-${new Date(Date.now()).toTimeString().slice(0, 8)}`,
      url: 'http://localhost:3000',
      defaultWidth: 320,
      defaultHeight: 320,
      autoShow: true
    })
  }

  return (
    <div className="App">
      <h1>Hello, world!</h1>
      <p>This is a template for an OpenFin application.</p>
        <p id="version-number-container">
            Current version: <span id="of-version">{version || 'The fin API is not available - you are probably running in a browser.'}</span>
        </p>
      <button onClick={handleClick}>window++</button>
    </div>
  )
}

export default App;

