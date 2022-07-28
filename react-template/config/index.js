import React from 'react'
import ReactDOM from 'react-dom'
import wrapper from '../src/app/index.jsx'

const App = wrapper({})
const app = React.createElement(App, {}, null)
ReactDOM.render(app, document.getElementById('root'))
