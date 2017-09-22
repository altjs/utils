import React from 'react'
import IsomorphicRenderer from '../../utils/IsomorphicRenderer'
import Alt from '../../dist/alt-with-runtime'

const alt = new Alt()

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>chillin</div>
    )
  }
})

export default IsomorphicRenderer(alt, App)
