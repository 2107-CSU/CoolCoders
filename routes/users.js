const express = require('express');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const usersRouter = express.Router();
const {  createUser, getUser, getUserById, getUserByEmail, deactivateUser, getAllUsers} = require('../db');
const { requireUser, requireAdmin } = require('./utils');

usersRouter.use((req, res, next) => {
    console.log('a request is being made to /users')
    
    next();
});

usersRouter.get('/', async (req, res, next) => {
    const users = await getAllUsers();

    res.send({ users });
})

usersRouter.post('/login', async (req, res, next) => {
    console.log('***', process.env.JWT_SECRET)
    const { email, password } = req.body;

    if (!email || !password) {
        next({
            name: 'MissingCredentialsError',
            message: 'Please supply both a email and password'
        });
    }

    try {
        const user = await getUserByEmail(email);

        if (user && user.password === password) {
            // create token and return it
            const { email, id } = user;
            const token = jwt.sign({
                email, id
                }, process.env.JWT_SECRET, {
                expiresIn: '1w'
            });
            res.send({ message: 'you are logged in', token });
        } else {
            next({
                name: 'IncorrectCredentialsError',
                message: 'Username or password is incorrect'
            });
        }
    } catch (error) {
        next(error)
    }
})

usersRouter.post('/register', async (req, res, next) => {
    const { email, name, password } = req.body;

    try {
        const _user = await getUserByEmail(email);

        if (_user) {
            next({
                name: 'UserExistsError',
                message: 'A user with that email address already exists'
            })
        }

        const user = await createUser({ email, name, password});

        const token = jwt.sign({
            email, id: user.id
            }, process.env.JWT_SECRET, {
            expiresIn: '1w'
        });

        res.send({
            message: 'thank you for signing up with us',
            token
        });
        
    } catch (error) {
        next(error)
    }
})

module.exports = usersRouter;