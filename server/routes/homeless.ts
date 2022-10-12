import { conn } from './index';
import { Router } from 'express';

const homelessRouter = Router();

homelessRouter.post('/save', function (req, res) {
  const { userId, noticeNo, filename, careNm, careTel, noticeEdt } = req.body;

  const sqlQuery = 'INSERT INTO HOMELESS VALUES (?,?,?,?,?,?)';
  conn.query(
    sqlQuery,
    [userId, noticeNo, filename, careNm, careTel, noticeEdt],
    function (err, rows, fields) {
      if (!err) {
        res.send(rows); // response send rows
      } else {
        res.send(err); // response send err
      }
    }
  );
});

homelessRouter.delete('/', function (req, res) {
  const { userId, noticeNo } = req.query;
  const sqlQuery = 'DELETE FROM HOMELESS WHERE userId=? AND noticeNo=?';
  conn.query(sqlQuery, [userId, noticeNo], function (err, rows, fields) {
    if (!err) {
      res.send(rows);
    } else {
      res.send(err);
    }
  });
});

homelessRouter.get('/', function (req, res) {
  const { userId } = req.query;
  const sqlQuery = `SELECT * FROM HOMELESS WHERE userId=?`;
  conn.query(sqlQuery, [userId], function (err, rows, fields) {
    if (!err) {
      res.send(rows);
    } else {
      res.send(err);
    }
  });
});

export { homelessRouter };
