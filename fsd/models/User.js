const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/projectDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.post("/add-user", async (req, res) => {
    try {
        const { name, reason, email, phone, city, state, addressline } = req.body;

        const newUser = new User({
            name,
            reason,
            email,
            phone,
            city,
            state,
            addressline,
        });

        await newUser.save(); // Save the user to the database
        res.status(201).send("User added successfully");
    } catch (error) {
        res.status(500).send("Error adding user");
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
