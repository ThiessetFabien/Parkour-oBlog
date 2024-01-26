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

app.get('/article/:id', (req, res) => {
    const articleId = req.params.id;
    const article = articlesData.find((article) => article.id === parseInt(articleId));

    if (!article) {
        return res.status(404).send('Articles non trouvé');
    }
    res.render('article', {article});
});

app.listen(3000, () => {
  console.log(`Serveur connecté sur le port ${port}`);
});
