const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const port = 4000;
const app = express();
const dir = './upload';

app.use(fileUpload());
app.use(express.static(__dirname));
app.listen(port, () => console.log(`Started server at http://localhost:${port}`));

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

app.post('/upload', function(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const file = req.files.file;

  file.mv(`${__dirname}\\upload\\${file.name}`, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
  });
});