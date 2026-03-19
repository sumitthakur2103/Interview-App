import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import interviewRoutes from './routes/interview.js';

const app = express();
const port = 3000;
dotenv.config();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/v1/interviews', interviewRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});