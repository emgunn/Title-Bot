const express = require('express');
const getMetaData = require('metadata-scraper');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/express_backend', (req, res) => {
    obj = {
        express: "Your Express backend is connected to React."
    };
    res.send(obj);
});

app.post("/submitURL", (req, res) => {
    console.log(req.body);

    res.header("Access-Control-Allow-Origin", "*");

    getMetaData(req.body.url)
        .then( data => {
            res.send(data.title);
        })
        .catch(err => {
            // just send "error" to client
            console.log(err);
            res.send("error");
        });
})

app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});