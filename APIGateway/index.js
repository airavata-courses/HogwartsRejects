const express = require('express');
const app = express();
const port = 8090;
const version = '1.0.0';
app.get('/login', (req, res) => {
  console.log(req),
  res.send({ version })
});
app.listen(port, () => console.log(`Listening on port ${port}`));
