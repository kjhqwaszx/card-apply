import React, { Suspense } from 'react'
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
import ApplyDone from '@pages/ApplyDone'
import MyPage from '@pages/MyPage'

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

        <Route
          path="/apply/:id"
          element={
            // 로그인한 사용자만 접근 가능
            <PrivateRoute>
              <Suspense fallback={<></>}>
                <ApplyPage />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/apply/done"
          element={
            // 로그인한 사용자만 접근 가능
            <PrivateRoute>
              <ApplyDone />
            </PrivateRoute>
          }
        />
        <Route
          path="/my"
          element={
            // 로그인한 사용자만 접근 가능
            <PrivateRoute>
              <MyPage />
            </PrivateRoute>
          }
        />

        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
