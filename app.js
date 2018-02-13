const express = require('express');
const init = require('./lib/init');
const add = require('./lib/add');
const upgrade = require('./lib/upgrade');
const remove = require('./lib/remove');
const getAppBundle = require('./lib/getAppBundle');
const dependencies = require('./lib/dependencies');
const getBundle = require('./lib/getBundle');
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer'); // v1.0.5
const upload = multer(); // for parsing multipart/form-data

const app = express();
app.use(cors());
app.use(bodyParser.json())

//all projects stored under {current directory}/projects/{UNIQUE NAME HASH}


//no required request parameters
const DIR = __dirname + '/projects'
app.post("/init", upload.array(), async function (req, res) {
  console.log("==================================Init start====================================")
  console.log("Init received")
  console.log(req)
  if(!req.body){
    console.log("no body")
    return res.status(200).send({ ok: false, error: "No body found" });
  }
  let { error, output } = await init(DIR, req.body.name);

  console.log("==================================Init end======================================\n")
  if (!error) {
    return res.status(200).send({ok: true, name: req.body.name})
  } else {
    return res.status(200).send({ ok: false, error: output });
  }

})

//required request parameters:
//  name: UUID for project (given during init)
//  pkg: package to be added
app.post('/add', upload.array(), async function(req, res) {
  console.log("==================================Add start=====================================")
  console.log("Add request received. name: " + req.body.name + " pkg: " + req.body.pkg)
  let {bundleName, error, output} = await add(DIR, req.body.name, req.body.pkg);   
  console.log("==================================Add end=======================================\n")
  if (!error) {
    return res.status(200).send({ok:true, buildUrl: DIR + '/' + req.body.name + '/' + bundleName, tag: bundleName})
  } else {
    return res.status(200).send({ok:false, error:output})
  }
})

//required request parameters:
//  name: UUID for project (given during init)
//  pkg: package to be upgraded
app.post('/upgrade', upload.array(), async function (req, res) {
  console.log("==================================Upgrade start=================================")
  console.log("Upgrade request received. name: " + req.body.name + " pkg: " + req.body.pkg)
  let {bundleName, error, output} = await upgrade(DIR, req.body.name, req.body.pkg);          
  console.log("==================================Upgrade end===================================\n") 
  if (!error) {
    return res.status(200).send({ok:true, buildUrl: DIR + '/' + req.body.name + '/' + bundleName, tag: bundleName})
  } else {
    return res.status(200).send({ok:false, error:output})
  }
})

//required request parameters:
//  name: UUID for project (given during init)
//  pkg: package to be removed
app.post('/remove', upload.array(), async function (req, res) {
  console.log("==================================Remove start==================================")
  console.log("Remove request received. name: " + req.body.name + " pkg: " + req.body.pkg)

  let {bundleName, error, output} = await remove(DIR, req.body.name, req.body.pkg);     

  console.log("==================================Remove end====================================\n")       
  if (!error) {
    return res.status(200).send({ok:true, buildUrl: DIR + '/' + req.body.name + '/' + bundleName, tag: bundleName})
  } else {
    return res.status(200).send({ok:false, error:output})
  }
})

//required request parameters:
//  name: UUID for project (given during init)
app.post('/dependencies',  upload.array(), async function (req, res) {
  console.log("==================================Dependencies start============================")
  console.log("Dependencies request received. name: " + req.body.name)

  let {error, output} = await dependencies(DIR, req.body.name);               
  
  console.log("==================================Dependencies end==============================\n")
  if (!error) {
    return res.status(200).send({ok:true, output})
  } else {
    return res.status(200).send({ok:false})  
  }      
})


//required request parameters:
//  name: UUID for project (given during init)
//  bundle: name of bundle to be downloaded (given during add, upgrade, or remove)
app.post('/getBundle',  upload.array(), async function (req, res) {
  console.log("==================================getBundle start===============================")
  console.log("Bundle request received. name: " + req.body.name + " bundle:" + req.body.bundle)

  let {error, output} = await getBundle(__dirname + "/bundles", DIR, req.body.name, req.body.bundle);

  console.log("==================================getBundle end=================================\n")
  if (!error) {
    return res.status(200).send({ok:true, output})
  } else {
    return res.status(200).send({ok:false})  
  }      
})

app.post('/getAppBundle',  upload.array(), async function (req, res) {
  console.log("==================================getAppBundle start============================")
  console.log("App bundle request received. name: " + req.body.name + " bundle:" + req.body.bundle)

  let {error, output} = await getAppBundle(DIR, req.body.name, req.body.bundle);

  console.log("==================================getAppBundle end==============================\n")
  if (!error) {
    return res.status(200).send({ok:true, output})
  } else {
    return res.status(200).send({ok:false})  
  }      
})


  
// Start the server
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});



