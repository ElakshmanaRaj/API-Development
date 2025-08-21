
const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL, {})
        console.log(`Database Connected: ${conn.connection.host}, ${conn.connection.name}`);
        
    } catch (error) {
        console.error(`Database Connection Failed: ${error.message}`)
        process.exit(1)
    }
}

module.exports = connectDB;