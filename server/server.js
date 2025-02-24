import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import connectDB from './configs/mongodb.js';


// app config
const port = process.env.PORT || 6001;
const app = express();

await connectDB();



// middleware
app.use(express.json());
app.use(cors());

// API routes
app.get('/', (req, res)=>{
    res.send('Api working very good')
})

app.listen(port, ()=>{
    console.log(`server is running on ${port}`);
})
