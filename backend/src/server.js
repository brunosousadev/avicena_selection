const express = require('express');
const routes = require('./routes');
const helmet = require('helmet')

require('./database');

const app = express();

app.use(express.json());
app.use(routes);
app.use(helmet());


app.listen(3333);