import { Router } from 'express';
import {
  createCard, findCards, deleteCard, likeCard, dislikeCard,
} from '../controllers/cards.js';
import { cardIdValidator, cardBodyValidator } from '../validators/validators.js';

export const cardRoutes = Router();

cardRoutes.post('/cards', cardBodyValidator, createCard);
cardRoutes.get('/cards', findCards);
cardRoutes.delete('/cards/:cardId', cardIdValidator, deleteCard);
cardRoutes.put('/cards/:cardId/likes', cardIdValidator, likeCard);
cardRoutes.delete('/cards/:cardId/likes', cardIdValidator, dislikeCard);
