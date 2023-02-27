const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const port = 3001;

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.post('/registration', (req, res) => {
  console.log(req.body);
 
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
