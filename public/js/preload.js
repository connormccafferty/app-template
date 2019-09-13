(async function() {
  console.log('Connecting');
  const client = await fin.InterApplicationBus.Channel.connect('test-channel', { wait: true });
  
  console.log('Connected to channel');
  client.setDefaultAction((action, payload) => {
      console.log(`Received a message`, { action, payload });
  });
  client.dispatch('my-action', 'my-payload');
})();
