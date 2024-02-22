import mongoose from 'mongoose';
import config from './config';
import Artist from './models/Artist';
import Album from './models/Album';
import Track from './models/Track';

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

  const [artistOne, artistSecond] = await Artist.create(
    {
      name: 'Adele',
      image: 'fixtures/images1.jpg',
      info: 'Adele, is an English singer-songwriter.',
    },
    {
      name: 'Би-2',
      image: 'fixtures/images2.jpg',
      info: 'Рок-группа, образованная в 1988 году в Бобруйске.',
    },
  );

  const [albumOne, albumSecond] = await Album.create(
    {
      title: 'Skyfall',
      year: '2012',
      image: 'fixtures/images3.jpg',
      artist: artistOne._id,
    },
    {
      title: 'Set Fire to the Rain',
      year: '2012',
      image: 'fixtures/images4.jpg',
      artist: artistOne._id,
    },
    {
      title: 'Я никому не верю',
      year: '2022',
      image: 'fixtures/images5.jpg',
      artist: artistSecond._id,
    },
    {
      title: 'Горизонт событий',
      year: '2017',
      image: 'fixtures/images6.jpg',
      artist: artistSecond._id,
    },
  );

  await Track.create(
    {
      name: 'When We Were Young',
      duration: 'Top hit song in 2016',
      album: albumOne._id,
    },
    {
      name: 'Skyfall',
      duration: 'Top hit song in 2012',
      album: albumOne._id,
    },
    {
      name: 'Easy on Me',
      duration: 'Top hit song in 2021',
      album: albumOne._id,
    },
    {
      name: 'Someone Like You',
      duration: 'Top hit song in 2011',
      album: albumOne._id,
    },
    {
      name: 'Hello',
      duration: 'Top hit song in 2015',
      album: albumOne._id,
    },

    {
      name: 'Полковнику никто не пишет',
      duration: 'Лучшая песня 2000г.',
      album: albumSecond._id,
    },
    {
      name: 'Мой рок-н-ролл',
      duration: 'Лучшая песня 2002г.',
      album: albumSecond._id,
    },
    {
      name: 'Ангелы',
      duration: 'Лучшая песня 2006г.',
      album: albumSecond._id,
    },
    {
      name: 'Птица на подоконнике',
      duration: 'Лучшая песня 2017г.',
      album: albumSecond._id,
    },
    {
      name: 'Компромисс',
      duration: 'Лучшая песня 2016г.',
      album: albumSecond._id,
    },
  );

  await db.close();
};

void run();