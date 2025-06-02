import React from 'react'
import './App.css'
import Button from './components/shared/Button'
import Input from '@shared/Input'
import TextField from '@shared/TextField'
import { useAlertContext } from '@/contexts/AlertContext'

function App() {
  const { open } = useAlertContext()
  return (
    <div className="App">
      <Button>클릭해주세요</Button>
      <Button color="success">클릭해주세요</Button>
      <Button color="error">클릭해주세요</Button>
      <Button color="success" weak={true}>
        클릭해주세요
      </Button>
      <Button color="error" weak={true}>
        클릭해주세요
      </Button>
      <Button full={true}>클릭해주세요</Button>
      <Button full={true} disabled={true}>
        클릭해주세요
      </Button>
      <div style={{ height: 10, width: '100%', background: '#efefef' }} />
      <Input placeholder="로그인" aria-invalid={true} />
      <Input />

      <TextField label="아이디" />
      <TextField label="패스워드" hasError={true} />

      <Button
        onClick={() => {
          open({
            title: '카드 신청 완료',
            description: '카드 신청이 완료되었습니다.',
            onButtonClick: () => {},
          })
        }}
      >
        {' '}
        Alert open
      </Button>

      {/*<Alert*/}
      {/*  open={true}*/}
      {/*  title="제목"*/}
      {/*  description="내용"*/}
      {/*  onButtonClick={() => {}}*/}
      {/*/>*/}
    </div>
  )
}

export default App
