import React from 'react'
import { render } from 'react-dom'
import { GlobalStyle } from './styles/GlobalStyle'
import { hot } from 'react-hot-loader/root'
import Greetings from './components/Greetings'

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Greetings />
    </>
  )
}

export default hot(App)
