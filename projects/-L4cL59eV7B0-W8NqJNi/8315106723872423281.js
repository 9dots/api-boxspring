/* index.js for vdasreawdfew */

const React = require('react')
const ReactDom = require('react-dom')
const Extra = require('./app2.js')
// const img = require('image.png')

function helloWorld(){
  console.log("heyllo worl")
}

class App extends React.Component { 
  render () { 
    return (
      <div>
        <h1>This only took a billion hoursfasre</h1>
        <h3>This works too!</h3>
        <button onClick={helloWorld}>This button actually works</button>
        <Extra/>
      </div>
    )
  }
}

ReactDom.render(<App/>, document.getElementById('app')) 