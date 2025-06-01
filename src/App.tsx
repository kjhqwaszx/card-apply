import React from 'react'
import './App.css'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Text from '@shared/Text'

const bold = css`
  font-weight: bold;
`

const containerStyle = css`
  background-color: pink;
`
const Button = styled.button`
  width: 200px;
  height: 100px;
  ${bold}
`

function App() {
  return (
    <div className="App" css={containerStyle}>
      <Text typography="t1" display="block" color="red">
        t1
      </Text>
      <Text typography="t2">t2</Text>
      <Text typography="t3">t3</Text>
    </div>
  )
}

export default App
