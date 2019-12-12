const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios')

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/series/upcoming', (req, res) => {
  axios.get(`https://api.pandascore.co/series/upcoming?token=P7jhyk5q4qOK-tiEXzT_1ovsLhKT8ECuj7t_BB6XOeYyb3u21yE`)
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      res.send(error)
    })
});

app.get('/api/:game/series/upcoming', (req, res) => {
  axios.get(`https://api.pandascore.co/${req.params.game}/series/upcoming?token=P7jhyk5q4qOK-tiEXzT_1ovsLhKT8ECuj7t_BB6XOeYyb3u21yE`)
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      res.send(error)
    })
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
    
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));