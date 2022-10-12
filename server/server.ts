import http from 'http';
import express from 'express';
import indexRouter from './routes';
import getUserIdFromRequest from './service/jwt-service';
import cors from 'cors';
import socket from './socket/socket';
import * as dotenv from 'dotenv';
dotenv.config();

const app: express.Application = express();

const TOKEN_KEY = process.env.JWT_SECRET!;
console.log('TOKEN_KEY', TOKEN_KEY);

const server = http.createServer(app);
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
socket(server);

const tokenChecker = (req: any, res: any, next: any) => {
  const userIdFromToken = getUserIdFromRequest(req);
  req.userId = userIdFromToken;
  next();
};

app.use(tokenChecker);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(indexRouter);

const port = 5000;
server.listen(port, () => console.log(`server on : port ${port}`));
