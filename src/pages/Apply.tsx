import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import Apply from '@components/apply'
import { updateApplyCard } from '@remote/apply'
import { APPLY_STATUS } from '@models/apply'
import { useAlertContext } from '@contexts/AlertContext'
import { useUserStore } from '@/store/user'
import useAppliedCard from '@/hooks/useAppliedCard'
import usePollApplyStatus from '@hooks/usePollApplyStatus'
import useApplyCardMutation from '@hooks/useApplyCardMutation'
import FullPageLoader from '@shared/FullPageLoader'

const STATUS_MESSAGE = {
  [APPLY_STATUS.READY]: '카드 심사를 준비하고있습니다.',
  [APPLY_STATUS.PROGRESS]: '카드를 심사중입니다. 잠시만 기다려주세요.',
  [APPLY_STATUS.COMPLETE]: '카드 신청이 완료되었습니다.',
}

function ApplyPage() {
  const navigate = useNavigate()
  const { open } = useAlertContext()

  const [readyToPoll, setReadyToPoll] = useState(false)

  const user = useUserStore((state) => state.user)
  const { id } = useParams() as { id: string }

  // 카드 신청 내역 조회
  const { data } = useAppliedCard({
    userId: user?.uid as string,
    cardId: id,
    options: {
      onSuccess: (applied) => {
        if (applied == null) {
          // 신청 내역이 없는 경우
          return
        }

        if (applied.status === APPLY_STATUS.COMPLETE) {
          // 발급이 완료된 경우
          open({
            title: '이미 발급이 완료된 카드입니다',
            onButtonClick: () => {
              window.history.back()
            },
          })

          return
        }
        // 진행중 or 반려 케이스
        setReadyToPoll(true)
      },
      onError: () => {},
      suspense: true,
    },
  })

  // 카드 신청 현황 Polling
  const { data: status } = usePollApplyStatus({
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

  if (data != null && data.status === APPLY_STATUS.COMPLETE) {
    // 완료 케이스의 경우, Modal 을 띄우기 때문에 부모는 빈 화면 노출.
    return null
  }

  if (readyToPoll || isLoading) {
    return <FullPageLoader message={STATUS_MESSAGE[status ?? 'READY']} />
  }

  return <Apply onSubmit={mutate} />
}

export default ApplyPage
