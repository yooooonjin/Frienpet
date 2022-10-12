import { conn } from './index';
import { Router } from 'express';
import { v4 } from 'uuid';

const lostpetRouter = Router();

lostpetRouter.post('/save', function (req, res) {
  const { petid, userid, sido, sigungu, bname, phone, location, desc } =
    req.body;

  const sqlQuery = 'INSERT INTO lostpet VALUE(?,?,?,?,?,?,?,?,?,now())';
  conn.query(
    sqlQuery,
    [v4(), petid, userid, sido, sigungu, bname, phone, location, desc],
    function (err, rows, fields) {
      if (!err) {
        res.send(rows); // response send rows
      } else {
        res.send(err); // response send err
      }
    }
  );
});

lostpetRouter.get('/', function (req, res) {
  const { limit, range, address } = req.query;
  const condition = limit === 'true' ? 'LIMIT 3' : '';
  const region = range === 'all' ? '' : `WHERE ${range} = '${address}'`;

  const sqlQuery = `SELECT * FROM lostpet ${region} ORDER BY CREATEDDATE DESC ${condition}`;
  conn.query(sqlQuery, function (err, rows, fields) {
    if (!err) {
      res.send(rows);
    } else {
      res.send(err);
    }
  });
});

lostpetRouter.delete('/', function (req, res) {
  const { lostpetid } = req.query;
  const sqlQuery = 'DELETE FROM lostpet WHERE lostpetid=?';
  conn.query(sqlQuery, [lostpetid], function (err, rows, fields) {
    if (!err) {
      res.send(rows);
    } else {
      res.send(err);
    }
  });
});

lostpetRouter.get('/lostpetByparam', function (req, res) {
  const params = Object.keys(req.query);
  const value = req.query[`${params}`];

  const sqlQuery = `SELECT * FROM lostpet WHERE ${params}=?`;

  conn.query(sqlQuery, value, function (err, rows, fields) {
    if (!err) {
      res.send(rows);
    } else {
      res.send(err);
    }
  });
});

lostpetRouter.post('/saveHelper', function (req, res) {
  const { lostpetid, userid, name, phone } = req.body;

  const sqlQuery = 'INSERT INTO helper VALUE(?,?,?,?)';
  conn.query(
    sqlQuery,
    [lostpetid, userid, name, phone],
    function (err, rows, fields) {
      if (!err) {
        res.send(rows); // response send rows
      } else {
        res.send(err); // response send err
      }
    }
  );
});

lostpetRouter.get('/allHelpers', function (req, res) {
  const sqlQuery = 'SELECT * FROM helper';
  conn.query(sqlQuery, function (err, rows, fields) {
    if (!err) {
      res.send(rows);
    } else {
      res.send(err);
    }
  });
});

lostpetRouter.get('/helpers', function (req, res) {
  const { lostpetid } = req.query;
  const sqlQuery = 'SELECT * FROM helper WHERE lostpetid=?';
  conn.query(sqlQuery, [lostpetid], function (err, rows, fields) {
    if (!err) {
      res.send(rows);
    } else {
      res.send(err);
    }
  });
});
lostpetRouter.delete('/helpers', function (req, res) {
  const params = Object.keys(req.query);
  const value = req.query[`${params}`];

  const sqlQuery = `DELETE FROM helper WHERE ${params}=?`;

  conn.query(sqlQuery, value, function (err, rows, fields) {
    if (!err) {
      res.send(rows);
    } else {
      res.send(err);
    }
  });
});

export { lostpetRouter };
