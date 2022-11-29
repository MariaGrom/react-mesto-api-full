import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import { BadRequestError } from '../errors/BadRequestError.js';
import { InternalServerError } from '../errors/InternalServerError.js';
import { UnauthorizedError } from '../errors/UnauthorizedError.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import { ConflictError } from '../errors/ConflictError.js';

 const { NODE_ENV, JWT_SECRET } = process.env;

// Создаем контроллер POST-запроса для создания нового пользователя с хешированием пароля
export const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((document) => {
      const user = document.toObject();
      delete user.password;
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Введены некорректные данные'));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с такой почтой уже существует'));
      } else {
        next(new InternalServerError('Произошла ошибка сервера'));
      }
    });
};

// Создаем контроллер логирования пользователя
export const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
        //'some-secret-key',
         { expiresIn: '7d' }
      );
      res.send({ token });
    })
    .catch(() => {
      next(new UnauthorizedError('Неверный логин или пароль'));
    });
};

// Создаем контроллер GET-запроса о текущем пользователе
export const findCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        next(new NotFoundError('Пользователь не найден'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Введены некорректные данные поиска'));
      } else {
        next(new InternalServerError('Произошла ошибка сервера'));
      }
    });
};

// Создаем контроллер GET-запроса всех пользователей
export const findUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      next(new InternalServerError('Произошла ошибка сервера'));
    });
};

// Создаем контроллер GET-запроса по id пользователя
export const findUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        next(new NotFoundError('Пользователь не найден'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Введены некорректные данные поиска'));
      } else {
        next(new InternalServerError('Произошла ошибка сервера'));
      }
    });
};

// Создаем контроллер PATCH-запроса по обновлению профиля
export const updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        next(new NotFoundError('Пользователь не найден'));
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Введены некорректные данные поиска'));
      } else {
        next(new InternalServerError('Произошла ошибка сервера'));
      }
    });
};

// Создаем контроллер PATCH-запроса по обновлению аватара профиля
export const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        next(new NotFoundError('Пользователь не найден'));
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Введены некорректные данные поиска'));
      } else {
        next(new InternalServerError('Произошла ошибка сервера'));
      }
    });
};
