import { Navigate } from 'react-router-dom'
import { useUserStore } from '@/store/user'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const user = useUserStore((state) => state.user)

  if (user == null) {
    return <Navigate to="/signin" replace={true} />
  }

  return <>{children}</>
}

export default PrivateRoute
