import { conn } from './index';
import { Router } from 'express';

const photoRouter = Router();

photoRouter.post('/save', function (req, res) {
  const { petid, order, url } = req.body;
  const photoid = `${petid}_${order}`;
  const sqlQuery =
    'INSERT INTO PHOTO VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE url=?';
  conn.query(
    sqlQuery,
    [photoid, petid, order, url, url],
    function (err, rows, fields) {
      if (!err) {
        res.send(rows); // response send rows
      } else {
        res.send(err); // response send err
      }
    }
  );
});

photoRouter.get('/', function (req, res) {
  const { petid } = req.query;
  const sqlQuery = 'SELECT * FROM PHOTO WHERE PETID=?';
  conn.query(sqlQuery, [petid], function (err, rows, fields) {
    if (!err) {
      res.send(rows);
    } else {
      res.send(err);
    }
  });
});

export { photoRouter };
