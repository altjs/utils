import React from 'react'
import IsomorphicRenderer from '../../utils/IsomorphicRenderer'
import Alt from '../../dist/alt-with-runtime'

const alt = new Alt()

const FooStore = alt.createStore({
  displayName: 'FooStore',
  state: { test: 'hello' }
})

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = FooStore.getState()
  }

  render() {
    return (
      <div>{this.state.test}</div>
    )
  }
})

export default IsomorphicRenderer(alt, App)
