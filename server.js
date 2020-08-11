const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');

const FeedbackService = require('./services/FeedbackService');
const SpeakersService = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakersService = new SpeakersService('./data/speakers.json');

const routes = require('./routes');

const port = 3000;
const app = express();

app.set('trust proxy', 1);
app.use(
  cookieSession({
    name: 'session',
    keys: ['OUFuodbodubdjmwe', 'oaudfOufdobaefAA'],
  })
);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// I can store local variables that are present throughout the whole express lifecycle here:
app.locals.siteName = 'ROUX Meetups';

app.use(express.static(path.join(__dirname, './static')));

// When an error occur, if we don't pass it to next(), it will bring down the entire application
app.get('/throw', (req, res, next) => {
  setTimeout(() => {
    next(new Error('Something went wrong...'));
  }, 500);
});

// Custom middleware to save local variables to be used in template
app.use(async (req, res, next) => {
  try {
    const names = await speakersService.getNames();
    res.locals.speakerNames = names;
    next();
  } catch (error) {
    next(error);
  }
});

app.use(
  '/',
  routes({
    feedbackService,
    speakersService,
  })
);

app.listen(port, () => {
  console.log(`Express server listening on port ${port}!`);
});
