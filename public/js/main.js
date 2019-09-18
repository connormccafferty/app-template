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

    $(function() {
        fetchAndMapData("NFLX").then(data => {
            $("#chart").igFinancialChart({
                dataSource: data,
                chartType: "candle",
                zoomSliderType: "candle"
            });

            $("#grid").igGrid({
                dataSource: data,
                features: [
                    {
                        name: "Sorting",
                        type: "local",
                        mode: "multi",
                        sortingDialogContainment: "window"
                    },
                    {
                        name: "Filtering",
                        type: "local",
                        mode: "advanced",
                        filterDialogContainment: "window"
                    },
                    {
                        name: "Hiding"
                    },
                    {
                        name: "ColumnMoving",
                        columnMovingDialogContainment: "window"
                    },
                    {
                        name: "Summaries"
                    }
                ]
            });
        });
    });
}
