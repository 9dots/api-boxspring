const express = require('express');
const init = require('./lib/init');
const add = require('./lib/add');
const upgrade = require('./lib/upgrade');
const remove = require('./lib/remove');
const multer = require('multer'); // v1.0.5
const upload = multer(); // for parsing multipart/form-data

const app = express();

//all projects stored under {current directory}/projects/{UNIQUE NAME HASH}
const DIR = __dirname + '/projects'
app.post("/init", async function (req, res) {
  console.log("Init received")
  let { error, output, name } = await init(DIR);
  if (!error) {
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
app.post('/add', upload.array(), async function(req, res) {
  console.log("Add request received. name: " + req.body.name + " pkg: " + req.body.pkg)
  let {bundleName, error, output} = await add(DIR, req.body.name, req.body.pkg);   
  if (!error) {
    return res.status(200).send({ok:true, buildUrl: DIR + '/' + req.body.name + '/' + bundleName, tag: bundleName})
  } else {
    return res.status(500).send({ok:false, error:output})
  }
})

// download :name from cloud storage
// yarn upgrade :package
// bundle
// upload dir to cloud storage
// upload bundle to cloud storage
// return {ok: bool, buildUrl: url, tag: string}
app.post('/upgrade', upload.array(), async function (req, res) {
  console.log("Upgrade request received. name: " + req.body.name + " pkg: " + req.body.pkg)
  let {bundleName, error, output} = await upgrade(DIR, req.body.name, req.body.pkg);           
  if (!error) {
    return res.status(200).send({ok:true, buildUrl: DIR + '/' + req.body.name + '/' + bundleName, tag: bundleName})
  } else {
    return res.status(500).send({ok:false, error:output})
  }
})

// download :name from cloud storage
// yarn remove :package
// bundle
// upload dir to cloud storage
// upload bundle to cloud storage
// return {ok: bool, buildUrl: url, tag: string}
app.post('/remove', upload.array(), async function (req, res) {
  console.log("Remove request received. name: " + req.body.name + " pkg: " + req.body.pkg)
  let {bundleName, error, output} = await remove(DIR, req.body.name, req.body.pkg);            
  if (!error) {
    return res.status(500).send({ok:true, buildUrl: DIR + '/' + req.body.name + '/' + bundleName, tag: bundleName})
  } else {
    return res.status(200).send({ok:false, error:output})
  }
})

// download :name/package.json from cloud storage
// return {ok: bool, dependencies: array}
app.post('/dependencies', async function (req, res) {
  //FIX: Figure out where you're getting the project name from, as well as the package name
  //let {bundleName, error, output} = yield dependencies(DIR, req.body.name);            
})

  
// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
