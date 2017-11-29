const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Welcome to port 3000!');
})

app.use(express.static(path.join(__dirname, 'assets', 'javascripts')));

app.get('/json', (req, res) => {
  const peoplePath = path.join('server', 'data', 'people.json');
  fs.readFile(peoplePath, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send();
    }
    const jsonData = data.toString();
    res.set('Content-Type', 'application/json')
      .status(200)
      .send(jsonData);
  });
});

app.get('/timeout', (req, res) => {
  let ms = 0;
  if (req.query) {
    const seconds = Number(req.query.seconds);
    if (!isNaN(seconds)) {
      ms = seconds * 1000;
    }
  }
  setTimeout(() => {
    res.status(408).send('Request timed out.');
  }, ms);
});

app.get('/block-thread', (req, res) => {
  const blockThreadPath = path.join('server', 'views', 'blockThread.html');
  fs.readFile(blockThreadPath, (err, html) => {
    if (err) {
      console.log(err);
      res.status(500).send();
    }
    res.set('Content-Type', 'text/html')
      .status(200)
      .send(html);
  });
});

app.use((req, res) => {
  res.status(404).send('Sorry, we cannot find that!');
});

app.listen(3000, () => console.log('Listening on port 3000.'));
