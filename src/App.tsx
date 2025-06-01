import React from 'react'
import logo from './logo.svg'
import './App.css'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

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
      <Button>스타일 버튼</Button>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
