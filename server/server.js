import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import connectDB from './configs/mongodb.js';
import userRouter from './routes/userRoutes.js';

// 8hbi8JnG6XRhKsMe

// App config
const port = process.env.PORT || 6002;
const app = express();
await connectDB();

// middleware
app.use(express.json());
app.use(cors());



// API routes
app.get('/', (req, res)=>{
    res.send("API Working")
})

app.use('/api/user', userRouter)

app.listen(port, ()=>{
    console.log(`server is listening on port ${port}`);
})
