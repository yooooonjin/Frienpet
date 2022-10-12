import { conn } from './index';
import { Router } from 'express';
import { v4 } from 'uuid';

const animalRouter = Router();

animalRouter.post('/save', function (req, res) {
  const { userid, name, upkind, kind, gender, size, color, feature } = req.body;

  const sqlQuery = 'INSERT INTO animal VALUE(?,?,?,?,?,?,?,?,?)';
  conn.query(
    sqlQuery,
    [v4(), userid, name, upkind, kind, gender, size, color, feature],
    function (err, rows, fields) {
      if (!err) {
        res.send(rows); // response send rows
      } else {
        res.send(err); // response send err
      }
    }
  );
});

animalRouter.get('/', function (req, res) {
  const { email } = req.query;
  const sqlQuery = 'SELECT * FROM ANIMAL WHERE USERID=?';
  conn.query(sqlQuery, [email], function (err, rows, fields) {
    if (!err) {
      res.send(rows); // response send rows
    } else {
      res.send(err); // response send err
    }
  });
});

animalRouter.put('/update', function (req, res) {
  const { name, upkind, kind, gender, size, feature, petid } = req.body;
  const sqlQuery =
    'UPDATE ANIMAL SET NAME=?,UPKIND=?, KIND=?,GENDER=?, SIZE=?,FEATURE=? WHERE PETID=?';
  conn.query(
    sqlQuery,
    [name, upkind, kind, gender, size, feature, petid],
    function (err, rows, fields) {
      if (!err) {
        res.send(rows); // response send rows
      } else {
        res.send(err); // response send err
      }
    }
  );
});

export { animalRouter };
