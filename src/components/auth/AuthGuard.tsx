import { useState } from 'react'

import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@remote/firebase'
import { useUserStore } from '@/store/user'

// 인증처리
function AuthGuard({ children }: { children: React.ReactNode }) {
  const [initialize, setInitialize] = useState(false)
  const setUser = useUserStore((state) => state.setUser)

  onAuthStateChanged(auth, (user) => {
    // 유저에 대한 인증 상태가 변경되면 실행된다.
    if (user != null) {
      setUser({
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
      })
    } else {
      setUser(null)
    }

    setInitialize(true)
  })

  if (!initialize) {
    return null
  }

  return <>{children}</>
}

export default AuthGuard
