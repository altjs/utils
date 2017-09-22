import React from 'react'
import PropTypes from 'prop-types';

export default function withAltContext(flux) {
  return (Component) => {
    class AltContextClass extends React.Component {
      constructor(props) {
        super(props)
      }

      getChildContext() {
        return { flux }
      }

      render() {
        return React.createElement(Component, this.props)
      }
    }

    AltContextClass.childContextTypes = {
      flux: PropTypes.object,
    }

    return AltContextClass
  }
}
