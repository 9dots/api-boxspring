const express = require('express');
const init = require('./lib/init');
const add = require('./lib/add');
const upgrade = require('./lib/upgrade');
const remove = require('./lib/remove');


const app = express();

//all projects stored under {current directory}/projects/{UNIQUE NAME HASH}
const DIR = __dirname + '/projects'
app.post("/init", async function (req, res) {
  console.log("Init received")
  let { code, output, name } = await init(DIR);
  // const name = 'test'
  // const code = 0
  // const output = ''
  if (code === 0) {
    return res.status(200).send({ok: true, name})
  } else {
    return res.status(500).send({ ok: false, error: output });
  }

});

// download :name from cloud storage
// yarn add :package
// bundle
// upload dir to cloud storage
// upload bundle to cloud storage
// return {ok: bool, buildUrl: url, tag: string}
app.post('/add', function * (req, res) {
  let {bundleName, error, output} = yield add(DIR, req.body.name, req.body.pkg);            
  if (error) {
    return {ok:false, error:output}
  } else {
    return {ok:true, buildUrl: DIR + '/' + req.body.name + '/' + bundleName, tag: 'FIX LATER'} 
  }
})

// download :name from cloud storage
// yarn upgrade :package
// bundle
// upload dir to cloud storage
// upload bundle to cloud storage
// return {ok: bool, buildUrl: url, tag: string}
app.post('/upgrade', function * (req, res) {
  let {bundleName, error, output} = yield upgrade(DIR, req.body.name, req.body.pkg);           
  if (error) {
    return {ok:false, error:output}
  } else {
    return {ok:true, buildUrl: DIR + '/' + req.body.name + '/' + bundleName, tag: 'FIX LATER'}
  }
})

// download :name from cloud storage
// yarn remove :package
// bundle
// upload dir to cloud storage
// upload bundle to cloud storage
// return {ok: bool, buildUrl: url, tag: string}
app.post('/remove', function * (req, res) {
  let {bundleName, error, output} = yield remove(DIR, req.body.name, req.body.pkg);            
  if (error) {
    return {ok:false, error:output}
  } else {
    return {ok:true, buildUrl: DIR + '/' + req.body.name + '/' + bundleName, tag: 'FIX LATER'}
  }
})

// download :name/package.json from cloud storage
// return {ok: bool, dependencies: array}
app.post('/dependencies', function * (req, res) {
  //FIX: Figure out where you're getting the project name from, as well as the package name
  //let {bundleName, error, output} = yield dependencies(DIR, req.body.name);            
})

  
// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
