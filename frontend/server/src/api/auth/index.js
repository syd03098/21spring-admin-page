const Router = require('koa-router');

const auth = new Router();

const authHandler = require('./auth.controller');

auth.post('/register', authHandler.localRegister);
auth.post('/login', authHandler.localLogin);
auth.get('/exists/:key(email|username)/:value', authHandler.exists);
auth.post('/logout', authHandler.logout);
auth.post('/refresh', authHandler.refresh);

module.exports = auth;
