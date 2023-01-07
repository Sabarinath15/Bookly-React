const express = require('express');
const app = express();

const account = require('./routers/account'); //router for accounts login and signup
const event = require('./routers/event'); //router for events
const slots = require('./routers/booking'); //slots router

//port
const port = process.env.PORT || 4000;

const start = async () => {
    try {
        app.listen(port, console.log(`Server is listening on ${port}...`));
    } catch (error) {
        console.log(error);
    }
}

start();
app.use(express.json());

//routers
app.use('/api/account', account);
app.use('/api/events', event);
app.use('/api/bookings', slots);