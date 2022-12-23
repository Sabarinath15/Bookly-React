const express = require('express');
const app = express();

const account = require('./routers/account'); //router for accounts login and signup

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

app.get('/item', async (req, res) => {
    res.send("It is working");
})

//routers
app.use('/api/account', account);