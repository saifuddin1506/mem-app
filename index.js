import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import postRoutes from './routes/posts.js'
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/posts', postRoutes);
app.get('/', (req, res) => {
    res.send("hello welcome to  memories")
})


// setting up the connection to mongoose and app.listen

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`server is running on PORT:${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);