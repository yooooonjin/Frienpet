// 라이브러리 불러오기
import express from 'express';
import indexRouter from './routes';
import { generateToken } from './service/auth-service';
import getUserIdFromRequest from './service/jwt-service';
const app: express.Application = express();

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
app.listen(port, () => console.log(`server on : port ${port}`));
