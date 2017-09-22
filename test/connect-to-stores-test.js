import { jsdom } from 'jsdom'
import Alt from 'alt'
import React from 'react'
import PropTypes from 'prop-types';
import ReactDom from 'react-dom'
import ReactDomServer from 'react-dom/server'
import connectToStores from '../src/connectToStores'
import { assert } from 'chai'
import sinon from 'sinon'
import TestUtils from 'react-addons-test-utils'

const alt = new Alt()

const testActions = alt.generateActions('updateFoo')

const testStore = alt.createStore(
  class TestStore {
    constructor() {
      this.bindAction(testActions.updateFoo, this.onChangeFoo)
      this.foo = 'Bar'
    }
    onChangeFoo(newValue) {
      this.foo = newValue
    }
  }
)

export default {
  'connectToStores wrapper': {
    beforeEach() {
      global.document = jsdom('<!doctype html><html><body></body></html>')
      global.window = global.document.defaultView
//      require('react/lib/ExecutionEnvironment').canUseDOM = true

      alt.recycle()
    },

    afterEach() {
      delete global.document
      delete global.window
    },

    'resolve props on re-render'() {
      const FooStore = alt.createStore(function () {
        this.x = 1
      }, 'FooStore')

      const getPropsFromStoresStub = sinon.stub().returns(FooStore.getState())

      class ChildClass extends React.Component {
        static getStores(props) {
          return [FooStore]
        }

        static getPropsFromStores = getPropsFromStoresStub

        render() {
          return <span>{this.props.x + this.props.y}</span>
        }
      }

      const Child = connectToStores(ChildClass)

      class Parent extends React.Component {
        constructor(props) {
          super(props)
          this.state = { y: 0 }
        }

        componentDidMount() {
          this.setState({ y: 1 })
        }

        render() {
          return <Child y={this.state.y} />
        }
      }

      const node = TestUtils.renderIntoDocument(
        <Parent />
      )

      assert(getPropsFromStoresStub.callCount === 2, 'getPropsFromStores called twice')

      const span = TestUtils.findRenderedDOMComponentWithTag(node, 'span')
      assert(span.innerHTML === '2', 'prop passed in is correct')
    },

    'missing the static getStores() method should throw'() {
      class BadComponentOne extends React.Component {
        render() {
          return React.createElement('div', null, 'Bad')
        }
      }

      assert.throws(() => connectToStores(BadComponentOne), 'expects the wrapped component to have a static getStores() method')
    },

    'element mounts and unmounts'() {
      const div = document.createElement('div')

      class LegacyClass extends React.Component {
        static getStores() {
          return [testStore]
        }

        static getPropsFromStores(props) {
          return testStore.getState()
        }

        render() {
          return React.createElement('div', null, `Foo${this.props.delim}${this.props.foo}`)
        }
      }


      const LegacyComponent = connectToStores(LegacyClass)

      ReactDom.render(
        <LegacyComponent />
      , div)

      ReactDom.unmountComponentAtNode(div)
    },

    'missing the static getPropsFromStores() method should throw'() {
      class BadComponentTwo extends React.Component {
        static getStores() {
          return [testStore]
        }

        render() {
          return React.createElement('div', null, 'Bad')
        }
      }

      assert.throws(() => connectToStores(BadComponentTwo), 'expects the wrapped component to have a static getPropsFromStores() method')
    },

    'es6 Class component can get props from stores'() {
      class LegacyComponent extends React.Component {
        static getStores() {
          return [testStore]
        }

        static getPropsFromStores(props) {
          return testStore.getState()
        }

        render() {
          return React.createElement('div', null, `Foo${this.props.delim}${this.props.foo}`)
        }
      }


      const WrappedComponent = connectToStores(LegacyComponent)
      const element = React.createElement(WrappedComponent, {delim: ': '})
      const output = ReactDomServer.renderToStaticMarkup(element)
      assert.include(output, 'Foo: Bar')
    },

    'component statics can see context properties'() {

      class ChildClass extends React.Component {
        static getStores(props, context) {
          return [context.store]
        }

        static getPropsFromStores(props, context) {
          return context.store.getState()
        }

        render() {
          return <span>Foo: {this.props.foo}</span>
        }
      }

      ChildClass.contextTypes = {
        store: PropTypes.object
      }

      const Child = connectToStores(ChildClass)

      class ContextComponent extends React.Component {
        getChildContext() {
          return { store: testStore }
        }

        render() {
          return <Child/>
        }
      }

      ContextComponent.childContextTypes = {
        store: PropTypes.object
      }

      const element = React.createElement(ContextComponent)
      const output = ReactDomServer.renderToStaticMarkup(element)
      assert.include(output, 'Foo: Bar')
    },

    'component can get use stores from props'() {
      class LegacyComponent extends React.Component {
        static getStores(props) {
          return [props.store]
        }

        static getPropsFromStores(props) {
          return props.store.getState()
        }

        render() {
          return React.createElement('div', null, `Foo${this.props.delim}${this.props.foo}`)
        }
      }

      const WrappedComponent = connectToStores(LegacyComponent)
      const element = React.createElement(WrappedComponent, {delim: ': ', store: testStore})
      const output = ReactDomServer.renderToStaticMarkup(element)
      assert.include(output, 'Foo: Bar')
    },

    'ES6 class component responds to store events'() {
      class ClassComponent1 extends React.Component {
        render() {
          return <span>{this.props.foo}</span>
        }
      }

      const WrappedComponent = connectToStores({
        getStores() {
          return [testStore]
        },
        getPropsFromStores(props) {
          return testStore.getState()
        }
      }, ClassComponent1)

      const node = TestUtils.renderIntoDocument(
        <WrappedComponent />
      )

      testActions.updateFoo('Baz')

      const span = TestUtils.findRenderedDOMComponentWithTag(node, 'span')

      assert(span.innerHTML === 'Baz')
    },

    'componentDidConnect hook is called '() {
      let componentDidConnect = false
      class ClassComponent2 extends React.Component {
        render() {
          return <span foo={this.props.foo} />
        }
      }
      const WrappedComponent = connectToStores({
        getStores() {
          return [testStore]
        },
        getPropsFromStores(props) {
          return testStore.getState()
        },
        componentDidConnect() {
          componentDidConnect = true
        }
      }, ClassComponent2)
      const node = TestUtils.renderIntoDocument(
        <WrappedComponent />
      )
      assert(componentDidConnect === true)
    },

    'storeDidChange hook is called '() {
      let storeDidChange

      class ClassComponent4 extends React.Component {
        render() {
          return <span foo={this.props.foo} />
        }
      }
      const WrappedComponent = connectToStores({
        getStores() {
          return [testStore]
        },
        getPropsFromStores(props) {
          return testStore.getState()
        },
        storeDidChange(state) {
          storeDidChange = state
        }
      }, ClassComponent4)
      const node = TestUtils.renderIntoDocument(
        <WrappedComponent />
      )

      testActions.updateFoo('Baz')

      assert.deepEqual(storeDidChange, {foo: 'Baz'})
    },

    'Component receives all updates'(done) {
      let componentDidConnect = false
      class ClassComponent3 extends React.Component {
        static getStores() {
          return [testStore]
        }
        static getPropsFromStores(props) {
          return testStore.getState()
        }
        static componentDidConnect() {
          testActions.updateFoo('Baz')
          componentDidConnect = true
        }
        componentDidUpdate() {
          assert(this.props.foo === 'Baz')
          done()
        }
        render() {
          return <span foo={this.props.foo} />
        }
      }

      const WrappedComponent = connectToStores(ClassComponent3)

      let node = TestUtils.renderIntoDocument(
        <WrappedComponent />
      )

      const span = TestUtils.findRenderedDOMComponentWithTag(node, 'span')
      assert(componentDidConnect === true)
    },


  }
}
