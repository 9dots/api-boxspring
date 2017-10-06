const express = require('express');
const init = require('lib/init')


const app = express();
const DIR = __dirname + '/projects'

app.post('/init', (req, res) => {
  let {code, output, name} = yield init(DIR)
  if (code === 0) {
    return {ok: true, name}
  } else {
    return {ok: false, error: output}
  }
})

app.post('/add', (req, res) => {
  // download :name from cloud storage
  // yarn add :package
  // bundle
  // upload dir to cloud storage
  // upload bundle to cloud storage
  // reutnr {ok: bool, buildUrl: url, tag: string}
})

app.post('/upgrade', (req, res) => {
  // download :name from cloud storage
  // yarn upgrade :package
  // bundle
  // upload dir to cloud storage
  // upload bundle to cloud storage
  // reutnr {ok: bool, buildUrl: url, tag: string}
})

app.post('/remove', (req, res) => {
  // download :name from cloud storage
  // yarn remove :package
  // bundle
  // upload dir to cloud storage
  // upload bundle to cloud storage
  // reutnr {ok: bool, buildUrl: url, tag: string}
})

app.post('/dependencies', (req, res) => {
  // download :name/package.json from cloud storage
  // return {ok: bool, dependencies: array}
})


// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
