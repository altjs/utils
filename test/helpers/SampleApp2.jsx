import React from 'react'
import createReactClass from 'create-react-class';
import IsomorphicRenderer from '../../utils/IsomorphicRenderer'
import Alt from '../../dist/alt-with-runtime'

const alt = new Alt()

const App = createReactClass({
  render() {
    return (
      <div>chillin</div>
    )
  }
})

export default IsomorphicRenderer(alt, App)
