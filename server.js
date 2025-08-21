
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectDB = require("./config/database")
const userRoutes = require("./routes/userRoute")


const app = express();

// Middleware
app.use(express.json())
app.use(cors
    ({
        origin:process.env.CLIENT_URL || "*",
        methods:["GET", "POST", "PUT", "DELETE"],
        allowedHeaders:["Content-Type", "Authorization"]
    }))


// DB connection
connectDB();

// Routes
app.use("/", userRoutes);


// Server PORT

const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=>{
    console.log(`Server Started at http://localhost:${PORT}`);
    
});