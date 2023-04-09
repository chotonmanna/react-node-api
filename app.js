const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const userRouters = require('./routes/user');
const categoryRouters = require('./routes/category');

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const port = 3001;

app.use('/user', userRouters);
app.use('/category', categoryRouters);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})