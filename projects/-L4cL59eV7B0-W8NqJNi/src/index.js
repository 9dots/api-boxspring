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
        <button onClick={helloWorld}>This button actually works fam</button>
        <Extra/>
      </div>
    )
  }
}

ReactDom.render(<App/>, document.getElementById('app')) 