const express = require('express');
const cors = require('cors');
const projectsRouter = require('./routes/projects');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/projects', projectsRouter);

app.use(errorHandler);

module.exports = app;
