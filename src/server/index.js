const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const root = './';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(root, 'dist')));
app.get('*', (req, res) => {
  res.sendFile('dist/browser/index.html', {root: root});
});

const port = process.env.PORT || '3000';
app.listen(port, () => console.log(`API running on localhost:${port}`));