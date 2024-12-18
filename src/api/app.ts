import express from 'express';
import cors from 'cors';
import UserRoute from './modules/users/routes/UserRoute.ts';
import AuthRoute from './modules/auth/routes/AuthRoute.ts';

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

const app = express();

const PREFIX = '/api';
const VERSION = '/v1';

app.use(express.json());
app.use(cors(corsOptions));

app.get(`${PREFIX}${VERSION}`, (_, res) => {
  res.send('Hello World');
});

UserRoute(`${PREFIX}${VERSION}`, app);
AuthRoute(`${PREFIX}${VERSION}`, app);

export default app;
