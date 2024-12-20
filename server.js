require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const BikeSchema = require('./Model/Model');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("DB is Connected..."))
    .catch(err => console.log("Error connecting to DB:", err.message));

// Routes
app.post('/newbike', async (req, res) => {
    const { bikename, bikeprice, bikecolor } = req.body;
    try {
        const newdata = new BikeSchema({ bikename, bikeprice, bikecolor });
        await newdata.save();
        const bikes = await BikeSchema.find();
        return res.json(bikes);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: err.message });
    }
});

app.get('/getbikes', async (req, res) => {
    try {
        const data = await BikeSchema.find();
        return res.json(data);
    } catch (err) {
        console.error(err.message);
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

// Update bike by ID
app.put('/updatebike/:id', async (req, res) => {
    const { bikename, bikeprice, bikecolor } = req.body;
    try {
      await BikeSchema.findByIdAndUpdate(req.params.id, { bikename, bikeprice, bikecolor });
      const bikes = await BikeSchema.find();
      return res.json(bikes);
    } catch (err) {
      console.error(err.message);
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

// Listen on the correct port for Vercel
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));

// Export the app for Vercel
module.exports = app;
