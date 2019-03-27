const express = require('express');
const middlewares = require('./middlewares');
const routes = require('./routes');

require('./database');
require('dotenv').config();

// Load passport strategy
require('./middlewares/passport');

const PORT = process.env.PORT || 8080;
const app = express();

// Middlewares
middlewares(app);

// Routes
routes(app);

app.listen(PORT, () => {
  console.log(`✅  Server running on ${PORT} port`);
});
