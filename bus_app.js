const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;

app.use(cors());
app.use(express.static('public'));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/bus-predictions.html');
});

// Function to fetch data from the API
async function getData(apiKey, base, params = {}) {
    const baseUrl = `http://mbus.ltp.umich.edu/bustime/api/v3/${base}?key=${apiKey}&format=json`;
    const urlParams = new URLSearchParams(params).toString();
    const fullUrl = `${baseUrl}&${urlParams}`;

    try {
        const response = await axios.get(fullUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// Route to fetch bus predictions
app.get('/bus-prediction', async (req, res) => {
    const base = 'getpredictions';
    const northboundFromCctc = [
        ["BB", "NORTHBOUND", "C250"],
        ["NW", "NORTHBOUND", "C251"],
        ["CN", "NORTHBOUND", "C250"]
    ];

    const stopNames = {
        "C250": "CCTC South",
        "C251": "CCTC North"
    };

    const result = [];

    try {
        for (const [routeId, direction, stopId] of northboundFromCctc) {
            const predictionData = await getData(apiKey, base, { rt: routeId, stpid: stopId, tmres: "s" });

            if (predictionData["bustime-response"] && predictionData["bustime-response"]["prd"]) {
                for (const prediction of predictionData["bustime-response"]["prd"]) {
                    if (prediction.rtdir === direction) {
                        result.push({
                            stop_name: stopNames[stopId],
                            route_id: routeId,
                            direction: direction,
                            stop_id: stopId,
                            vehicle_id: prediction.vid,
                            arrival_time: prediction.prdctdn
                        });
                    }
                }
            }
        }

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch bus predictions' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
