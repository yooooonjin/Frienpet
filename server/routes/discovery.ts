import { conn } from './index';
import { Router } from 'express';
import { v4 } from 'uuid';

const discoveryRouter = Router();

discoveryRouter.post('/save', function (req, res) {
  const {
    email,
    sido,
    sigungu,
    bname,
    location,
    lat,
    lng,
    upkind,
    kind,
    size,
    color,
    gender,
    desc,
    photo,
  } = req.body;
  const sqlQuery =
    'INSERT INTO DISCOVERY VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,now())';
  conn.query(
    sqlQuery,
    [
      v4(),
      email,
      sido,
      sigungu,
      bname,
      location,
      lat,
      lng,
      upkind,
      kind,
      size,
      color,
      gender,
      desc,
      photo,
    ],
    function (err, rows, fields) {
      if (!err) {
        res.send(rows); // response send rows
      } else {
        res.send(err); // response send err
      }
    }
  );
});
discoveryRouter.get('/', function (req, res) {
  const { range, address } = req.query;
  const region = range === 'all' ? '' : `WHERE ${range} = '${address}'`;
  const sqlQuery = `SELECT * FROM DISCOVERY ${region} ORDER BY CREATEDDATE DESC`;
  conn.query(sqlQuery, function (err, rows, fields) {
    if (!err) {
      res.send(rows);
    } else {
      res.send(err);
    }
  });
});

export { discoveryRouter };
