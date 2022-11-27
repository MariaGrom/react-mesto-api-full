import * as dotenv from 'dotenv';
dotenv.config();
console.log(process.env.NODE_ENV);
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import { constants } from 'http2';
import { errors } from 'celebrate';
import { userRoutes } from './routes/users.js';
import { cardRoutes } from './routes/cards.js';
import { createUser, login } from './controllers/users.js';
import { auth } from './middlewares/auth.js';
import { userBodyValidator, userLoginValidator } from './validators/validators.js';
import { NotFoundError } from './errors/NotFoundError.js';
import { requestLogger, errorLogger } from './middlewares/logger.js'

const app = express();

const { PORT = 3000 } = process.env;

mongoose.set({ runValidators: true });
mongoose.connect('mongodb://localhost:27017/mestodb'); // подключаемся к базе данных

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

// **** nmp КОРС 
app.use(cors({
origin: '*',
allowedHeaders:[
  'Content-Type',
  'Authorization'
]
}));

// Подключаем логгер запросов
app.use(requestLogger);

// Вызываем роутинг регистрации
app.post('/signup', userBodyValidator, createUser);

// Вызываем роутинг входа
app.post('/signin', userLoginValidator, login);

// Вызываем авторизацию
app.use(auth);

// Вызываем роутинг пользователя
app.use('/', userRoutes);

// Вызываем роутинг карточек
app.use('/', cardRoutes);

// Запрос главной страницы приложения
app.all('/*', (req, res, next) => {
  next(new NotFoundError('Страница не существует'));
});

// Подключаем логгер ошибок
app.use(errorLogger); 

// Обработчик ошибок celebrate
app.use(errors());

// Централизованный обработчик ошибок
app.use((err, req, res, next) => {
  const status = err.statusCode || constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
  const message = err.message || 'Неизвестная ошибка';
  res.status(status).send({ message });
  next();
});

app.listen(PORT, () => {
  console.log('Запускаем сервер 3000!');
});
