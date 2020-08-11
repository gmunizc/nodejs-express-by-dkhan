const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { speakersService } = params;

  router.get('/', async (req, res, next) => {
    try {
      const speakers = await speakersService.getList();
      const artWork = await speakersService.getAllArtwork();
      res.render('layout', { pageTitle: 'Speakers', template: 'speakers', speakers, artWork });
    } catch (error) {
      next(error);
    }
  });

  router.get('/:shortname', async (req, res, next) => {
    try {
      const speaker = await speakersService.getSpeaker(req.params.shortname);
      const artWork = await speakersService.getArtworkForSpeaker(req.params.shortname);
      res.render('layout', { pageTitle: 'Speakers', template: 'speaker-detail', speaker, artWork });
    } catch (error) {
      next(error);
    }
  });

  return router;
};
