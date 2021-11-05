const express = require('express');
const cors = require('cors');
const listTaskRoute = require('./routes/listTask');

const app = express();

const port = 3003;

app.use(cors());
app.use(express.json());

app.use('/listTask', listTaskRoute);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
