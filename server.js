const express = require('express');
const helmet = require('helmet');

// const actionRouter = require('./data/helpers/actionRouter');
const projectRouter = require('./data/helpers/projectRouter');

const server = express();

server.use(express.json());
server.use(helmet());

// server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);

server.get('/', (req, res) => {
    res.send(`
        <h2>API Node Challenge</h2>
    `);
});

module.exports = server;