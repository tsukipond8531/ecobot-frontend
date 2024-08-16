import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import * as Sentry from '@sentry/node'

import config from './config/config.js';

import * as errorHandler from './middlewares/errors.js'

import routes from './routes';

Sentry.init({ dsn: process.env.SENTRY_DSN })

const { HOST, PORT } = config;

const app = express();

// This request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler())

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    // if (whitelist.indexOf(origin) !== -1) {
    callback(null, true)
    // } else {
    //   callback(new Error("Not allowed by CORS"))
    // }
  }
}

app.use(cors(corsOptions));
app.use(helmet())
app.use(compression())
app.use(morgan('----> :method :url :status'))
app.use(bodyParser.json())
app.use(errorHandler.bodyParser)
app.use(express.json());

app.use(express.static(path.join(__dirname, './../public/build')));

app.use('/api', routes);

// This error handler must be before any other error middleware
app.use(Sentry.Handlers.errorHandler())

app.use(errorHandler.genericErrorHandler)
app.use(errorHandler.notFound)
app.use(errorHandler.methodNotAllowed)

// Define routes and middleware
app.listen((HOST, PORT), () => {
  console.log(`Server is running on ${HOST}:${PORT}`);
});

// Catch unhandled rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection', err)

  try {
    Sentry.captureException(err)
  } catch (err) {
    console.error('Sentry error', err)
  } finally {
    process.exit(1)
  }
})

// Catch uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception', err)

  try {
    Sentry.captureException(err)
  } catch (err) {
    console.error('Sentry error', err)
  } finally {
    process.exit(1)
  }
})

export default app;