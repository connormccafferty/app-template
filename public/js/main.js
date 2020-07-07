// uncomment line below to register offline cache service worker
// navigator.serviceWorker.register('../serviceworker.js');

if (typeof fin !== "undefined") {
    init();
} else {
    document.querySelector("#of-version").innerText =
        "The fin API is not available - you are probably running in a browser.";
}

// once the DOM has loaded and the OpenFin API is ready
async function init() {
    // get a reference to the current Application.
    const app = await fin.Application.getCurrent();
    const win = await fin.Window.getCurrent();

    const ofVersion = document.querySelector("#of-version");
    ofVersion.innerText = await fin.System.getVersion();

    const launchBtn = document.getElementById("launch");

    launchBtn.addEventListener("click", async (event) => {
        await launchDeepLink();
    });
}

async function launchDeepLink() {
    const app = await fin.Application.wrap({
        uuid: "OpenfinPOC1",
    });
    const url = "http://localhost:5555/app1.json";
    let isRunning = await app.isRunning();

    if (!isRunning) {
        await fin.Application.startFromManifest(url);
        await app.addListener("run-requested", console.log);
    } else if (isRunning) {
        let args = { foo: "bar" };
        fin.Application.startFromManifest(url, {
            userAppConfigArgs: args,
        })
            .then(console.log)
            .catch((err) => {});
    }
}
