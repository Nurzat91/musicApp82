import mongoose from 'mongoose';
import config from './config';
import Artist from './models/Artist';
import Album from './models/Album';
import Track from './models/Track';
import {randomUUID} from 'crypto';
import User from './models/User';

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

  const collections = ['artists', 'albums', 'tracks', 'users'];

  for (const collectionName of collections){
    await dropCollection(db, collectionName);
  }

  const [user1, user2] = await User.create({
    username: "User1",
    password: "123",
    token: randomUUID(),
    displayName: "Naksu"
  }, {
    username: "User2",
    password: "123",
    token: randomUUID(),
    displayName: "Sun"
  });

  const [artistOne, artistSecond] = await Artist.create(
    {
      name: 'Adele',
      image: 'fixtures/images1.jpg',
      info: 'Adele, is an English singer-songwriter.',
      user: user1._id,
    },
    {
      name: 'Би-2',
      image: 'fixtures/images2.jpg',
      info: 'Рок-группа, образованная в 1988 году в Бобруйске.',
      user: user2._id,
    },
  );

  const [albumOne, albumSecond, albumThird, albumFourth] = await Album.create(
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
      title: 'Горизонт событий',
      year: '2017',
      image: 'fixtures/images6.jpg',
      artist: artistSecond._id,
    },
    {
      title: 'Я никому не верю',
      year: '2022',
      image: 'fixtures/images5.jpg',
      artist: artistSecond._id,
    },
  );

  await Track.create(
    {
      name: 'When We Were Young',
      duration: 'Top hit song in 2016',
      album: albumOne._id,
      tracksNumber: 1,
    },
    {
      name: 'Skyfall',
      duration: 'Top hit song in 2012',
      album: albumOne._id,
      tracksNumber: 2,
    },
    {
      name: 'Easy on Me',
      duration: 'Top hit song in 2021',
      album: albumOne._id,
      tracksNumber: 3,
    },
    {
      name: 'Someone Like You',
      duration: 'Top hit song in 2011',
      album: albumOne._id,
      tracksNumber: 4,
    },
    {
      name: 'Hello',
      duration: 'Top hit song in 2015',
      album: albumOne._id,
      tracksNumber: 5,
    },
    {
      name: 'When We Were Young',
      duration: 'Top hit song in 2016',
      album: albumSecond._id,
      tracksNumber: 6,
    },
    {
      name: 'Skyfall',
      duration: 'Top hit song in 2012',
      album: albumSecond._id,
      tracksNumber: 7,
    },
    {
      name: 'Easy on Me',
      duration: 'Top hit song in 2021',
      album: albumSecond._id,
      tracksNumber: 8,
    },
    {
      name: 'Someone Like You',
      duration: 'Top hit song in 2011',
      album: albumSecond._id,
      tracksNumber: 9,
    },
    {
      name: 'Hello',
      duration: 'Top hit song in 2015',
      album: albumSecond._id,
      tracksNumber: 10,
    },

    {
      name: 'Полковнику никто не пишет',
      duration: 'Лучшая песня 2000г.',
      album: albumThird._id,
      tracksNumber: 11,
    },
    {
      name: 'Мой рок-н-ролл',
      duration: 'Лучшая песня 2002г.',
      album: albumThird._id,
      tracksNumber: 12,
    },
    {
      name: 'Ангелы',
      duration: 'Лучшая песня 2006г.',
      album: albumThird._id,
      tracksNumber: 13,
    },
    {
      name: 'Птица на подоконнике',
      duration: 'Лучшая песня 2017г.',
      album: albumThird._id,
      tracksNumber: 14,
    },
    {
      name: 'Компромисс',
      duration: 'Лучшая песня 2016г.',
      album: albumThird._id,
      tracksNumber: 15,
    },
    {
      name: 'Полковнику никто не пишет',
      duration: 'Лучшая песня 2000г.',
      album: albumFourth._id,
      tracksNumber: 16,
    },
    {
      name: 'Мой рок-н-ролл',
      duration: 'Лучшая песня 2002г.',
      album: albumFourth._id,
      tracksNumber: 17,
    },
    {
      name: 'Ангелы',
      duration: 'Лучшая песня 2006г.',
      album: albumFourth._id,
      tracksNumber: 18,
    },
    {
      name: 'Птица на подоконнике',
      duration: 'Лучшая песня 2017г.',
      album: albumFourth._id,
      tracksNumber: 19,
    },
    {
      name: 'Компромисс',
      duration: 'Лучшая песня 2016г.',
      album: albumFourth._id,
      tracksNumber: 20,
    },
  );

  await db.close();
};

void run();