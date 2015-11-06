import Alt from 'alt'
import ActionListeners from '../src/ActionListeners'
import { assert } from 'chai'

export default {
  'ActionListeners': {
    'addActionListener': {
      'adding an action listener'() {
        const alt = new Alt()
        const action = alt.generateActions('someAction')
        const actionListeners = new ActionListeners(alt)
        assert.throw(
          () => actionListeners.addActionListener(action.SOME_ACTION, undefined),
          'addActionListener() expects a function as the second argument'
        )
      }
    }
  }
}
