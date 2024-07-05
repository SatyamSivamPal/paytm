const express = require('express');
const cors = require('cors');

const routing = require('./routers/index')
const port = 7000;

const app = express();

app.use(express.json());
app.use(cors())

app.use('/api/v1', routing)
app.get("/", (req,res) => {
    res.json({
        msg: "hy connected to the server"
    })
})

app.listen(port, () => {
    console.log("Server is running in the port " + port);
})