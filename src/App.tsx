import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '@pages/Home'
import TestPage from '@pages/Test'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
