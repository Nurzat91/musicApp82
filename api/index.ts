import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import config from "./config";
import albumRouter from "./routers/album";
import artistRouter from "./routers/artist";
import trackRouter from "./routers/track";
import userRouter from './routers/users';
import trackHistoryRouter from './routers/trackHistory';


const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(cors());
app.use(express.json());

app.use('/artists', artistRouter);
app.use('/albums', albumRouter);
app.use('/tracks', trackRouter);
app.use('/users', userRouter);
app.use('/track_history', trackHistoryRouter);

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