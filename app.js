const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Charger les données du fichier JSON
const dataPath = path.join(__dirname, 'data', 'articles.json');
const articlesData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
  res.render('index', { articles: articlesData });
});

app.get('/article', (req, res) => {
  res.render('articles', { articles: articlesData });
});

app.listen(3000, () => {
  console.log(`Serveur connecté sur le port ${port}`);
});
