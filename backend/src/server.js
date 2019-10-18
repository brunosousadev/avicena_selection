const express = require('express');
const routes = require('./routes');
const helmet = require('helmet')
const cors = require('cors');

require('./database');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(helmet());


app.listen(3333);