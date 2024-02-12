import express from 'express';
import albumRouter from "./routers/album";
import mongoose from 'mongoose';
import config from "./config";
import artistRouter from "./routers/artist";
import trackRouter from "./routers/track";

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());

app.use('/artists', artistRouter);
app.use('/albums', albumRouter);
app.use('/tracks', trackRouter);

const run = async () => {
  await mongoose.connect(config.mongoose.db);

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  })
};

void run();