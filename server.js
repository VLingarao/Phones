require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const BikeSchema = require('./Model/Model');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000; // Use the port from the environment variable or fallback to 3000

app.use(cors({
    origin: 'http://localhost:5173', // Allow only this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    credentials: true // Enable credentials if needed
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("DB is Connected...");
    }).catch(err => {
        console.log("Error is Facing:", err.message);
    });

// Post method 
app.post('/newbike', async (req, res) => {
    const { bikename, bikeprice, bikecolor } = req.body;
    try {
        const newdata = new BikeSchema({ bikename, bikeprice, bikecolor });
        await newdata.save();
        const bikes = await BikeSchema.find();
        return res.json(bikes);
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ error: err.message });
    }
});

// Get method
app.get('/getbikes', async (req, res) => {
    try {
        const Data = await BikeSchema.find();
        return res.json(Data);
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ error: err.message });
    }
});

// Get single data
app.get('/getbikes/:id', async (req, res) => {
    try {
        const SingleData = await BikeSchema.findById(req.params.id);
        return res.json(SingleData);
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ error: err.message });
    }
});

// Delete Method
app.delete('/deletebike/:id', async (req, res) => {
    try {
        await BikeSchema.findByIdAndDelete(req.params.id);
        const bikes = await BikeSchema.find();
        return res.json(bikes);
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
