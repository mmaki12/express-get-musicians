const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")
const {musicians} = require("./routes")
const port = 3000;
const musicians = [];


app.use(express.json());     
app.use(express.urlencoded({ extended: true })); 

musicians1.use("/musician",musicians1)
musicians2.use("/band",musicians2)




app.post('/musicians', (req, res) => {
    const newMusician = req.body; 
    musicians.push(newMusician);
    res.json(newMusician);
  });
  app.put('/musicians/:id', (req, res) => {
    const musicianId = parseInt(req.params.id);
    const updatedMusician = req.body;
    
    const index = musicians.findIndex(musician => musician.id === musicianId);
    
    if (index !== -1) {
      musicians[index] = updatedMusician;
      res.json(updatedMusician);
    } else {
      res.status(404).json({ message: 'Musician not found' });
    }
  });
  
  
  app.delete('/musicians/:id', (req, res) => {
    const musicianId = parseInt(req.params.id);
    const index = musicians.findIndex(musician => musician.id === musicianId);
    
    if (index !== -1) {
      musicians.splice(index, 1);
      res.json({ message: 'Musician deleted' });
    } else {
      res.status(404).json({ message: 'Musician not found' });
    }
  });
  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



app.get("/musicians", async (req, res) => {
    const musician = await Musician.findAll();
    res.json({musician});
})


app.get("/musicians/:id", async (req, res) => {
    const music = await Musician.findByPk(req.params.id)
    res.json(music)
  })





module.exports = app;

