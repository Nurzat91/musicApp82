import mongoose from 'mongoose';
import config from './config';
import Artist from './models/Artist';
import Album from './models/Album';

const dropCollection = async (db: mongoose.Connection, collectionName: string) =>{
  try {
    await db.dropCollection(collectionName);
  }catch (e){
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};
const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  const collections = ['artists', 'albums', 'tracks', 'users', 'track_history'];

  for (const collectionName of collections){
    await dropCollection(db, collectionName);
  }

  await Artist.create(
    {
      name: 'Adele',
      image: 'fixtures/images1.jpg',
      info: 'Adele, is an English singer-songwriter.',
    },
    {
      name: 'Би-2',
      image: 'fixtures/images2.jpg',
      info: 'рок-группа, образованная в 1988 году в Бобруйске.',
    },
  );

  await Album.create(
    {
      title: 'Skyfall',
      year: '2012',
      image: 'fixtures/images3.jpg',
    },
    {
      title: 'Set Fire to the Rain',
      year: '2012',
      image: 'fixtures/images4.jpg',
    },
    {
      title: 'Я никому не верю',
      year: '2022',
      image: 'fixtures/images5.jpg',
    },
    {
      title: 'Горизонт событий',
      year: '2017',
      image: 'fixtures/images6.jpg',
    },
  );

  await db.close();
};

void run();