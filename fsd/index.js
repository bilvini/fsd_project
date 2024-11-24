const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");  // Path to your schema
const port = 80;
const app = express();

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/projectDG", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => {
        console.error("MongoDB connection error: ", err);
        process.exit(1); // Exit if MongoDB connection fails
    });

let db = mongoose.connection;

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Main route
app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": "*",
    });
    return res.sendFile(__dirname + "/public/index.html");
});

// Form submission route using Mongoose schema
app.post("/formFillUp", (req, res) => {
    const { name, reason, email, phone, city, state, addressline } = req.body;

    // Validate data before inserting
    if (!name || !email || !phone || !city || !state) {
        return res.status(400).send("Missing required fields.");
    }

    const newUser = new User({
        name,
        reason,
        email,
        phone,
        city,
        state,
        addressline
    });

    // Save the new user to the database
    newUser.save()
        .then(() => {
            console.log("User data saved successfully!");
            return res.sendFile(__dirname + "/public/formSubmitted.html");
        })
        .catch((err) => {
            console.error("Error inserting data: ", err);
            return res.status(500).send("Error inserting data into the database.");
        });
});

// Start the server
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});
