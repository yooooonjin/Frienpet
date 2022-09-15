import { generateToken } from './../service/auth-service';
import { Router } from 'express';
import { authRouter } from './auth';
import connection from '../../database/db_connect';
import { animalRouter } from './animal';
import { photoRouter } from './photo';
import { discoveryRouter } from './discovery';

connection.connect();
export const conn = connection;

const router = Router();
router.use('/api/auth', authRouter);
router.use('/api/animal', animalRouter);
router.use('/api/animal/photo', photoRouter);
router.use('/api/discovery', discoveryRouter);

// console.log(generateToken('hyj950109@naver.com'));

export default router;
