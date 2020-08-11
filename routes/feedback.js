const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { feedbackService } = params;

  router.get('/', async (req, res, next) => {
    try {
      const feedback = await feedbackService.getList();
      res.render('layout', { pageTitle: 'Feedback', template: 'feedback', feedback });
    } catch (error) {
      next(error);
    }
  });

  router.post('/', (req, res, next) => {
    try {
      console.log(req.body);
      res.send('Feedback form posted!');
    } catch (error) {
      next(error);
    }
  });

  return router;
};
