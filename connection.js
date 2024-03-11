const mongoose = require("mongoose");

const connectionDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Connection failed:", error.message);
    }
};

module.exports = { connectionDB };
