import { Link } from 'react-router-dom'
import Flex from '@shared/Flex'
import Button from '@shared/Button'

function Navbar() {
  return (
    <Flex>
      <Link to="/">홈</Link>
      <Link to="/signUp">
        <Button>로그인/회원가입</Button>
      </Link>
    </Flex>
  )
}

export default Navbar
