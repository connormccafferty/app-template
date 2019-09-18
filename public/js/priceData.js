function mapData(raw) {
    let timeSeriesKeys = Object.keys(raw["Time Series (Daily)"]);
    let timeSeries = [];

    for (let i = 0; i < timeSeriesKeys.length; i++) {
        let entry = {};
        entry[timeSeriesKeys[i]] =
            raw["Time Series (Daily)"][timeSeriesKeys[i]];
        timeSeries.push(entry);
    }

    let mappedData = timeSeries.map(obj => {
        let key = Object.keys(obj)[0];
        let newObj = {};
        newObj.time = new Date(key);
        newObj.open = parseInt(obj[key]["1. open"]);
        newObj.high = parseInt(obj[key]["2. high"]);
        newObj.low = parseInt(obj[key]["3. low"]);
        newObj.close = parseInt(obj[key]["4. close"]);
        newObj.volume = parseInt(obj[key]["5. volume"]);
        return newObj;
    });

    return mappedData.reverse();
}

const API_KEY = "CD8DPESXRYNAPRSW";

function fetchAndMapData(symbol) {
    let API_URL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${API_KEY}`;
    return new Promise((resolve, reject) => {
        fetch(API_URL)
            .then(result => result.json())
            .then(data => resolve(mapData(data)))
            .catch(err => reject(err));
    });
}
