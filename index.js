require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const apiRouter = require('./src/router/apiRouter');

const cors = require('./src/middlewares/cors');


const app = express();

const PORT = process.env.PORT ?? 6622;


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors);

app.use('/', apiRouter);

// app.use('/', (req, res) => { res.sendStatus(404); });
// app.use(errorHandler);

// app.use((err, req, res, next) => {
//   console.error('====>>>>', err.stack);
//   res.status(500).send('Something broke!');
// });

app.listen(PORT, () => {
  console.log(`Server is up on ${PORT}`);
});
