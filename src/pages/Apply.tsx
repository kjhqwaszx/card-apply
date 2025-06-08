import Apply from '@components/apply'

import useApplyCardMutation from '@hooks/useApplyCardMutation'
import { useState } from 'react'
import usePollApplyStatus from '@hooks/usePollApplyStatus'
import { updateApplyCard } from '@remote/apply'
import { useUserStore } from '@/store/user'
import { APPLY_STATUS } from '@models/apply'
import { useNavigate, useParams } from 'react-router-dom'

function ApplyPage() {
  const [readyToPoll, setReadyToPoll] = useState(false)
  const navigate = useNavigate()
  const user = useUserStore((state) => state.user)
  const { id } = useParams() as { id: string }

  // 카드 신청 현황 Polling
  usePollApplyStatus({
    onSuccess: async () => {
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.COMPLETE,
        },
      })
      navigate('/apply/done?success=true', {
        replace: true,
      })
    },
    onError: async () => {
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.REJECT,
        },
      })
      navigate('/apply/done?success=false', {
        replace: true,
      })
    },
    enabled: readyToPoll,
  })

  // 카드신청
  const { mutate, isLoading } = useApplyCardMutation({
    onSuccess: () => {
      setReadyToPoll(true)
    },
    onError: () => {
      window.history.back()
    },
  })
  // if (data != null && data.status === APPLY_STATUS.COMPLETE) {
  //   return null
  // }

  if (readyToPoll || isLoading) {
    return <div>Loading ...</div>
    // return <FullPageLoader message="카드를 신청중입니다" />
  }

  return <Apply onSubmit={mutate} />
}

export default ApplyPage
