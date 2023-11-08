const express = require("/");
const app = require("./src/app");
const { Musician, Band } = require("./models/index")
const { db } = require("./db/connection");
const { seedMusician, seedBand } = require("./seedData");
const PORT = require("./server")

musicians = express.Router();

musicians1.get("/",(req,res) => {
    res.json(seedMusician);
});

musicians2.get("/",(req,res) => {
    res.json(seedBand);
});



module.exports = {
    musicians,
};
