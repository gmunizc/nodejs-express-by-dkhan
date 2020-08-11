const express = require('express');

const router = express.Router();

module.exports = () => {
  router.get('/', (req, res) => {
    res.send('Speakers list');
  });

  router.get('/:shortname', (req, res) => {
    res.send(`Detail page of ${req.params.shortname}`);
  });

  return router;
};
