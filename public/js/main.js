// uncomment line below to register offline cache service worker 
// navigator.serviceWorker.register('../serviceworker.js');

if (typeof fin !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        init();
    })
} else {
    document.querySelector('#of-version').innerText =
        'The fin API is not available - you are probably running in a browser.';
}

// once the DOM has loaded and the OpenFin API is ready
async function init() {
    // get a reference to the current Application.
    const app = await fin.Application.getCurrent();
    const win = await fin.Window.getCurrent();

    const ofVersion = document.querySelector('#of-version');
    ofVersion.innerText = await fin.System.getVersion();

    openDevTools();

    // fin.Application.startFromManifest('http://localhost:5555/app_child.json').then(app => console.log(app)).catch(err => console.log(err));
    // fin.desktop.Application.createFromManifest('http://localhost:5555/app_child.json', app => {
    //     app.run()
    // }, err => console.error('Failed to create app from manifest: ', err));


    // only launch new windows from the main window.
    if (win.identity.name === 'OpenfinPOC') {
        // fin.Application.startFromManifest('http://localhost:5555/app_child.json').then(app => {
        //     console.log(app)
        //     createChannel();

        // }).catch(err => console.log(err));
        createFromManifestAndRun('http://localhost:5555/app_child.json');
        document.cookie = "test=test";
        
    }
}

async function createChannel() {
    const channel = await fin.InterApplicationBus.Channel.create('test-channel');
    console.log('Channel created');
    channel.setDefaultAction((action, payload, identity) => {
        console.log(`Someone sent a message`, { action, payload, identity });
        channel.send(identity, action, payload);
    });
    channel.onConnection(identity => console.log(`Someone connected`, identity));
}

function openDevTools() {
    const { identity } = fin.Window.getCurrentSync();
    fin.System.showDeveloperTools(identity);
}

function createFromManifestAndRun(manifest) {

    fin.desktop.Application.createFromManifest(manifest, (createdApp) => {
    
    createdApp.run(() => {
    
    // fin.desktop.InterApplicationBus.subscribe("*", "Shutdown", function(message, uuid, name) {
    
    // console.log("The application " + uuid + " sent this message: " + message);
    
    // createdApp.close();
    
    // fin.desktop.Application.getCurrent().close();
    
    // });
    createChannel()
    
    console.info("Launched Successfully: ", createdApp);
    
    }, () => {
    
    console.info("Launch Error: ", createdApp);
    
    });
    
  })
}