const router = require('express').Router();
const cors = require('cors');

const auth = require('../middlewares/auth');

const signInRouter = require('./signin');
const signUpRouter = require('./signup');
const userRouter = require('./users');
const cardRouter = require('./cards');
const NotFoundErr = require('../errors/notFound');
const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://mesto.raznex.nomoredomains.rocks',
  'https://mesto.raznex.nomoredomains.rocks',
];

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.use(cors({
  origin: allowedCors,
  credentials: true,
}));

router.use('/', signInRouter);
router.use('/', signUpRouter);
router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use((req, res, next) => next(new NotFoundErr('Страницы по запрошенному URL не существует')));
router.use(errorLogger);

module.exports = router;
