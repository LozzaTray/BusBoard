const express = require('express')
const app = express()
const port = 3000
const BusStop = require('./backend/BusStop').BusStop;

//api
app.get('/departureBoards/:postcode', async (request, response) => {
    const postcode = request.params.postcode;

    try{
        const closestBusStops = await BusStop.stopsClosestToPostcode(postcode);
        response.json(closestBusStops);
    }
    catch{
        response.sendStatus(404);
    }
});

//serve frontend directory
app.use(express.static('frontend'));

//custom routes
app.use('/test', express.static('frontend/test.html'));
app.use('/timetable', express.static('frontend/timetable.html'));
app.use('/history', express.static('frontend/history.html'));

//listen
app.listen(port, () => console.log(`Example app listening on port ${port}!`))