import React from 'react'
import { render } from 'react-dom'
import { Flex, Box, getCSS } from '../package/dist/index.js'

const App = props => (
  <div className="container">
    <h1>Micro Grid</h1>

    <Flex center>
      <Box w={[
        [1],
        [500, 1/2],
        [1000, 1/4]
      ]}>
        <div className="filler tomato"/>
      </Box>
      <Box w={[
        [1],
        [500, 1/2],
        [1000, 1/4]
      ]}>
        <div className="filler whitesmoke"/>
      </Box>
      <Box w={[
        [1],
        [500, 1/2],
        [1000, 1/4]
      ]}>

      <Flex g={1}>
        <Box w={1/2}>
          <div className="filler black"/>
        </Box>
        <Box w={1/2}>
          <div className="filler grey"/>
        </Box>
      </Flex>

      </Box>
      <Box w={[
        [1],
        [500, 1/2],
        [1000, 1/4]
      ]}>
        <div className="filler black"/>
      </Box>
    </Flex>
  </div>
)

render(<App/>, document.getElementById('root'))

console.log(getCSS())
