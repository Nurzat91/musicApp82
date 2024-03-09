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
    username: "user",
    password: "123",
    token: randomUUID(),
    displayName: "User",
    role: 'user',
  }, {
    username: "admin",
    password: "123",
    token: randomUUID(),
    displayName: "Admin",
    role: 'admin',
  });

  const [artistOne, artistSecond, artistThird] = await Artist.create(
    {
      name: 'Adele',
      image: 'fixtures/images1.jpg',
      info: 'Adele, is an English singer-songwriter.',
      user: user2._id,
      isPublished: true,
    },
    {
      name: 'Би-2',
      image: 'fixtures/images2.jpg',
      info: 'Рок-группа, образованная в 1988 году в Бобруйске.',
      user: user1._id,
      isPublished: true,
    },{
      name: 'Bakr',
      image: 'fixtures/images7.jpg',
      info: 'Имя и фамилия: Абубакр Абдыкапаров. · Творческий псевдоним: Bakr / Бакр. ',
      user: user1._id,
      isPublished: false,
    },
  );

  const [albumOne, albumSecond, albumThird, albumFourth, albumFifth] = await Album.create(
    {
      title: 'Skyfall',
      year: '2012',
      image: 'fixtures/images3.jpg',
      artist: artistOne._id,
      isPublished: true,
    },
    {
      title: 'Set Fire to the Rain',
      year: '2012',
      image: 'fixtures/images4.jpg',
      artist: artistOne._id,
      isPublished: true,
    },
    {
      title: 'Горизонт событий',
      year: '2017',
      image: 'fixtures/images6.jpg',
      artist: artistSecond._id,
      isPublished: true,
    },
    {
      title: 'Я никому не верю',
      year: '2022',
      image: 'fixtures/images5.jpg',
      artist: artistSecond._id,
      isPublished: true,
    },
    {
      title: 'Не лей',
      year: '2021',
      image: 'fixtures/images7.jpg',
      artist: artistThird._id,
      isPublished: false,
    },
  );

  await Track.create(
    {
      name: 'When We Were Young',
      duration: '3:10',
      album: albumOne._id,
      tracksNumber: 1,
      isPublished: true,
    },
    {
      name: 'Skyfall',
      duration: '4:01',
      album: albumOne._id,
      tracksNumber: 2,
      isPublished: true,
    },
    {
      name: 'Easy on Me',
      duration: '5:00',
      album: albumOne._id,
      tracksNumber: 3,
      isPublished: true,
    },
    {
      name: 'Someone Like You',
      duration: '2:59',
      album: albumOne._id,
      tracksNumber: 4,
      isPublished: true,
    },
    {
      name: 'Hello',
      duration: '3:50',
      album: albumOne._id,
      tracksNumber: 5,
      isPublished: true,
    },
    {
      name: 'When We Were Young',
      duration: '4:15',
      album: albumSecond._id,
      tracksNumber: 6,
      isPublished: true,
    },
    {
      name: 'Skyfall',
      duration: '3:11',
      album: albumSecond._id,
      tracksNumber: 7,
      isPublished: true,
    },
    {
      name: 'Easy on Me',
      duration: '6:33',
      album: albumSecond._id,
      tracksNumber: 8,
      isPublished: true,
    },
    {
      name: 'Someone Like You',
      duration: '4:00',
      album: albumSecond._id,
      tracksNumber: 9,
      isPublished: true,
    },
    {
      name: 'Hello',
      duration: '5:02',
      album: albumSecond._id,
      tracksNumber: 10,
      isPublished: true,
    },

    {
      name: 'Полковнику никто не пишет',
      duration: '3:55',
      album: albumThird._id,
      tracksNumber: 11,
      isPublished: true,
    },
    {
      name: 'Мой рок-н-ролл',
      duration: '4:03',
      album: albumThird._id,
      tracksNumber: 12,
      isPublished: true,
    },
    {
      name: 'Ангелы',
      duration: '5:22',
      album: albumThird._id,
      tracksNumber: 13,
      isPublished: true,
    },
    {
      name: 'Птица на подоконнике',
      duration: '3:33',
      album: albumThird._id,
      tracksNumber: 14,
      isPublished: true,
    },
    {
      name: 'Компромисс',
      duration: '4:05',
      album: albumThird._id,
      tracksNumber: 15,
      isPublished: true,
    },
    {
      name: 'Полковнику никто не пишет',
      duration: '2:55',
      album: albumFourth._id,
      tracksNumber: 16,
      isPublished: true,
    },
    {
      name: 'Мой рок-н-ролл',
      duration: '6:00',
      album: albumFourth._id,
      tracksNumber: 17,
      isPublished: true,
    },
    {
      name: 'Ангелы',
      duration: '5:02',
      album: albumFourth._id,
      tracksNumber: 18,
      isPublished: true,
    },
    {
      name: 'Птица на подоконнике',
      duration: '3:44',
      album: albumFourth._id,
      tracksNumber: 19,
      isPublished: true,
    },
    {
      name: 'Компромисс',
      duration: '2:59',
      album: albumFourth._id,
      tracksNumber: 20,
      isPublished: true,
    },
    {
      name: 'Не лей',
      duration: '3:00',
      album: albumFifth._id,
      tracksNumber: 21,
      isPublished: false,
    },
    {
      name: 'Вредина',
      duration: '3:50',
      album: albumFifth._id,
      tracksNumber: 22,
      isPublished: false,
    },
    {
      name: 'Статус души',
      duration: '3:00',
      album: albumFifth._id,
      tracksNumber: 23,
      isPublished: false,
    },
  );

  await db.close();
};

void run();