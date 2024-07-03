const express = require('express');
const cors = require('cors');

const routing = require('./routers/index')
const port = 3000;

const app = express();

app.use(express.json());
app.use(cors())

app.use('/api/v1', routing)

app.listen(port, () => {
    console.log("Server is running in the port " + port);
})