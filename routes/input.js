const express = require('express');
const router = express.Router();
const inputs = require('../db/inputDb');

/* GET input values. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await inputs.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting inputs `, err.message);
    next(err);
  }
});

/* POST input values */
router.post('/', async function(req, res, next) {
    try {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.setHeader('Access-Control-Allow-Credentials', true);
      res.json(await inputs.create(req.body.value));
    } catch (err) {
      console.error(`Error while creating input value`, err.message);
      next(err);
    }
  });

  /* DELETE input values */
router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await inputs.remove(req.params.id));
    } catch (err) {
      console.error(`Error while deleting programming language`, err.message);
      next(err);
    }
  });

module.exports = router;