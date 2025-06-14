import { ChangeEvent } from 'react'
import styled from '@emotion/styled'
import { getAuth, updateProfile } from 'firebase/auth'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { collection, doc, updateDoc } from 'firebase/firestore'

import { app, storage, store } from '@remote/firebase'
import { COLLECTIONS } from '@constants'
import { useUserStore } from '@/store/user'

function MyImage({
  size = 40,
  mode = 'default',
}: {
  size?: number
  mode?: 'default' | 'upload'
}) {
  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)

  // 이미지 업로드
  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    console.log('files', files)

    const currentUser = getAuth(app).currentUser

    if (files == null || user == null || currentUser == null) {
      return
    }

    const fileName = files[0].name
    const storageRef = ref(storage, `users/${user.uid}/${fileName}`)

    // firebase Storage 에 이미지 업로드
    const uploaded = await uploadBytes(storageRef, files[0])

    const downloadUrl = await getDownloadURL(uploaded.ref)

    // firebase auth 정보 업데이트
    await updateProfile(currentUser, {
      photoURL: downloadUrl,
    })

    // firebase firestore 내 유저 정보 업데이트
    await updateDoc(doc(collection(store, COLLECTIONS.USER), currentUser.uid), {
      photoURL: downloadUrl,
    })

    setUser({
      ...user,
      photoURL: downloadUrl,
    })
  }

  return (
    <Container>
      <img
        src={
          user?.photoURL ||
          'https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-64.png'
        }
        alt="유저의 이미지"
        width={size}
        height={size}
      />
      {mode === 'upload' ? (
        <input type="file" accept="image/*" onChange={handleUploadImage} />
      ) : null}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  & img {
    border-radius: 100%;
  }

  & input[type='file'] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`

export default MyImage
