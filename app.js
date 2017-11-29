const express = require('express');
const init = require('lib/init')


const app = express();

//all projects stored under {current directory}/projects/{UNIQUE NAME HASH}
const DIR = __dirname + '/projects'

app.post("/init", function * (req, res) {
  let { code, output, name } = yield init(DIR);
  if (code === 0) {
    return { ok: true, name };
  } else {
    return { ok: false, error: output };
  }

  res.json({name});                                           //FIX: most likely not the proper way to
});

// download :name from cloud storage
// yarn add :package
// bundle
// upload dir to cloud storage
// upload bundle to cloud storage
// reutnr {ok: bool, buildUrl: url, tag: string}
app.post('/add', (req, res) => {
  let {bundleName, error, output} = yield add(DIR, req.body.name, req.body.pkg);            //FIX: Figure out where you're getting the project name from, as well as the package name
  if (error) {
    return {ok:false, error:output}
  } else {
    return {ok:true, buildUrl: DIR + '/' + req.params.name + '/' + bundleName, tag: 'FIX LATER'}      //FIX: not sure what the tag field is, nor if that's the correct buildURL
  }
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
