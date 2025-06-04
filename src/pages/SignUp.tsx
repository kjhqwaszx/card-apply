import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { collection, doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

import { auth, store } from '@remote/firebase'
import { COLLECTIONS } from '@constants'
import Form from '@components/signUp/Form'
import { FormValues } from '@models/signUp'

function SignUpPage() {
  const navigate = useNavigate()

  const handleSubmit = async (formValues: FormValues) => {
    const { email, password, name } = formValues

    const { user } = await createUserWithEmailAndPassword(auth, email, password)

    await updateProfile(user, {
      displayName: name,
    })

    // user 정보 Storage에 저장
    const newUser = {
      uid: user.uid,
      email: user.email,
      displayName: name,
    }

    // user.uid 값으로 doc을 저장한다.
    await setDoc(doc(collection(store, COLLECTIONS.USER), user.uid), newUser)

    navigate('/')
  }

  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}

export default SignUpPage
