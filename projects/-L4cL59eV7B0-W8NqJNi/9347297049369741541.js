/* index.js for vdasreawdfew */

const React = require('react')
const ReactDom = require('react-dom')
// const img = require('image.png')
console.log(React)

function helloWorld(){
  console.log("heyllo worl")
}

class App extends React.Component { 
  render () { 
    return (
      <h1>Is this handy dandy?</h1>
      <h3>This works too!</h3>
    )
  }
}

ReactDom.render(<App/>, document.getElementById('app'))