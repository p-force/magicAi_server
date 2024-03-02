require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const apiRouter = require('./src/router/apiRouter');
const { Pool } = require('pg');

const cors = require('./src/middlewares/cors');


const app = express();

const PORT = process.env.PORT ?? 6622;

const pool = new Pool({
  connectionString: "postgres://default:hM9erd7gVAiL@ep-polished-river-a4gpuqh3-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
})

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors);

app.use('/', apiRouter(pool));

// app.use('/', (req, res) => { res.sendStatus(404); });
// app.use(errorHandler);

// app.use((err, req, res, next) => {
//   console.error('====>>>>', err.stack);
//   res.status(500).send('Something broke!');
// });

app.listen(PORT, () => {
  console.log(`Server is up on ${PORT}`);
});
