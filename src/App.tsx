import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '@pages/Home'
import TestPage from '@pages/Test'
import CardPage from '@pages/Card'
import ApplyPage from '@pages/Apply'
import ScrollToTop from '@shared/SrollToTop'
import SignIn from '@pages/SignIn'
import SignUp from '@pages/SignUp'
import Navbar from '@shared/Navbar'
import PrivateRoute from '@components/auth/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signuP" element={<SignUp />} />
        <Route path="/card/:id" Component={CardPage} />
        {/*카드신청은 로그인한 사용자만 접근 가능*/}
        <Route
          path="/apply/:id"
          element={
            <PrivateRoute>
              <ApplyPage />
            </PrivateRoute>
          }
        />

        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
