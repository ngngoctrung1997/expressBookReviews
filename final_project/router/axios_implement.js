const axios = require('axios');
const express = require("express");
const axiosRouter = express.Router();

axiosRouter.get("/t10", async(req, res) => {
    let response = await axios.get("https://ngngoctrung1-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/");
    res.json(response.data);
})

axiosRouter.get("/t11/:isbn", async(req, res) => {
    let isbn = req.params.isbn;
    let response = await axios.get(`https://ngngoctrung1-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/isbn/${isbn}`);
    res.json(response.data);
})

axiosRouter.get("/t12/:author", async(req, res) => {
    let author = req.params.author;
    let response = await axios.get(`https://ngngoctrung1-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/author/${author}`);
    res.json(response.data);
})

axiosRouter.get("/t13/:title", async(req, res) => {
    let title = req.params.title;
    let response = await axios.get(`https://ngngoctrung1-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/title/${title}`);
    res.json(response.data);
})

module.exports.axiosImplement = axiosRouter;