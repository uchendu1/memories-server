import express from "express";
import bodyParser from "body-parser";
import Mongoose from "mongoose";
import cors from "cors";
const PORT = process.env.PORT || 5000;

import postRoutes from "./routes/posts.js";
import userRoutes from './routes/users.js';
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.get('/', (req, res) => {
  res.send('APPIS RUNNING');
})
app.use(cors());
app.use('/posts', postRoutes);
app.use('/user', userRoutes);




Mongoose.connect("mongodb://127.0.0.1:27017/memories", {
  useNewUrlParser: true,
});
const connection = Mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established successfully");
});

app.listen(PORT, () => {
  console.log(`port ${PORT} is running .........`);
});
