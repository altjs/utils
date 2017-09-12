import React from 'react'
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

export default function withAltContext(flux) {
  return (Component) => {
    return createReactClass({
      childContextTypes: {
        flux: PropTypes.object,
      },

      getChildContext() {
        return { flux }
      },

      render() {
        return React.createElement(Component, this.props)
      },
    })
  }
}
