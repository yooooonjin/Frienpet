import { createJWT } from './../service/jwt-service';
import { conn } from './index';
import { Router } from 'express';
import { encryptedPassword, isPasswordCorrect } from '../service/auth-service';

const authRouter = Router();

authRouter.post('/join', async function (req, res) {
  const { email, name, pw, phone, upr_cd, org_cd } = req.body;
  const hashedPw = await encryptedPassword(pw);
  const sqlQuery = 'INSERT INTO USER VALUE(?,?,?,?,?,?,now())';
  conn.query(
    sqlQuery,
    [email, name, hashedPw, phone, upr_cd, org_cd],
    function (err, rows, fields) {
      if (!err) {
        res.send(rows); // response send rows
      } else {
        res.send(err); // response send err
      }
    }
  );
});

authRouter.post('/login', function (req, res) {
  const { email, pw } = req.body;

  const sqlQuery = 'SELECT pw, COUNT(*) as count FROM USER WHERE EMAIL=?';
  conn.query(sqlQuery, [email], function (err, rows, fields) {
    if (!err) {
      let isCorrect = false;
      if (rows[0].count === 0) {
        res.send(isCorrect);
      } else {
        isPasswordCorrect(pw, rows[0].pw).then(async (result) => {
          if (result) {
            isCorrect = true;

            let token: string | null = null;
            try {
              await createJWT(email).then((res) => {
                token = res;
              });
            } catch (error) {
              console.log(error);
            }

            res.cookie('access_token', token, {
              // httpOnly: true,
              maxAge: 1000 * 60 * 60 * 24,
            });
          }
          res.send(isCorrect);
        });
      }
    } else {
      res.send(err); // response send err
    }
  });
});

authRouter.get('/logout', function (req, res) {
  res.clearCookie('access_token');
  res.send('logout');
});

authRouter.get('/', function (req, res) {
  const { email } = req.query;
  const sqlQuery =
    'SELECT email, name, phone, upr_cd, org_cd FROM USER WHERE EMAIL=?';
  conn.query(sqlQuery, [email], function (err, rows, fields) {
    if (!err) {
      res.send(rows); // response send rows
    } else {
      res.send(err); // response send err
    }
  });
});

export { authRouter };
