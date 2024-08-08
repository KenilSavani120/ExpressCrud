import express from "express"   
import route from "./routes/userRoutes.js";
import dotenv from 'dotenv';
import { mySqlPool } from "./dataBase.js";

// dotenv configuration
dotenv.config();
const app = express();

// PORT
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Routes
app.use("/api", route)

// conditionally listen
mySqlPool.query("SELECT 1").then(() => {
    console.log("DB Connected");
}).catch(error => {
    console.error("Error connecting to the database:", error);
});

app.listen(PORT,()=>{
    console.log("Server is Running");
    
})


// app.listen(PORT,()=>{
//     console.log("Server is Running");            
// })