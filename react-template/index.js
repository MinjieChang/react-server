import React from 'react'
import ReactDOM from 'react-dom'
import wrapper from './src/app/index.jsx'

// DOM mode
function setup(context) {
  // const { props, state } = context
  // context.setComponent(
  //   wrapper({
  //     ...props,
  //     ...state,
  //   }),
  //   'React',
  // )
  const App = wrapper(context)
  context.render = function render() {
    const app = React.createElement(App, context.props, null)
    context.vm = app
    ReactDOM.render(app, context.$el)
  }

  context.update = function render() {
    const app = React.createElement(App, context.props, null)
    context.vm = app
    ReactDOM.render(app, context.$el)
  }

  context.destroy = function destroy() {
    ReactDOM.unmountComponentAtNode(context.$el)
  }
}

export default setup
