import { Router } from 'express';
import {
  findUsers,
  findUserById,
  updateUserProfile,
  updateUserAvatar,
  findCurrentUser,
} from '../controllers/users.js';
import { userAvatarValidator, userProfileValidator, userIdValidator } from '../validators/validators.js';

export const userRoutes = Router();

userRoutes.get('/users/me', findCurrentUser);
userRoutes.get('/users', findUsers);
userRoutes.get('/users/:userId', userIdValidator, findUserById);
userRoutes.patch('/users/me', userProfileValidator, updateUserProfile);
userRoutes.patch('/users/me/avatar', userAvatarValidator, updateUserAvatar);
