const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Welcome to port 3000!');
})

app.get('/timeout', (req, res) => {
  res.status(408).send('Request timed out.');
});

app.use((req, res) => {
  res.status(404).send('Sorry, we cannot find that!');
});

app.listen(3000, () => console.log('Listening on port 3000.'));
