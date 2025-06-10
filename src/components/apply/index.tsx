import Terms from '@components/apply/Terms'
import BasicInfo from '@components/apply/BasicInfo'
import CardInfo from '@components/apply/CardInfo'

import { APPLY_STATUS, ApplyValues } from '@models/apply'
import { useEffect, useState } from 'react'
import { useUserStore } from '@/store/user'
import { useParams } from 'react-router-dom'
import ProgressBar from '../shared/ProgressBar'

const LAST_STEP = 3

function Apply({ onSubmit }: { onSubmit: (applyValues: ApplyValues) => void }) {
  const user = useUserStore((state) => state?.user)
  const { id } = useParams() as { id: string }
  const storageKey = `applied-${user?.uid}-${id}`

  // 카드 신청정보
  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>(() => {
    const applied = localStorage.getItem(storageKey)
    // 카드신청 중도 이탈한 내역이 있는지 확인.
    if (!applied) {
      return {
        userId: user?.uid,
        cardId: id,
        step: 0,
      }
    } else {
      return JSON.parse(applied)
    }
  })

  useEffect(() => {
    if (applyValues.step === 3) {
      // 마지막 단계인 경우 카드신청

      localStorage.removeItem(storageKey)
      onSubmit({
        ...applyValues,
        appliedAt: new Date(),
        status: APPLY_STATUS.READY,
      } as ApplyValues)
    } else {
      // 중도 이탈의 경우 localStorage 에 정보 저장
      localStorage.setItem(storageKey, JSON.stringify(applyValues))
    }
  }, [applyValues, onSubmit, storageKey])

  const handleTermsChange = (terms: ApplyValues['terms']) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      terms,
      step: (prevValues.step as number) + 1,
    }))
  }

  const handleBasicInfoChange = (
    infoValues: Pick<ApplyValues, 'salary' | 'payDate' | 'creditScore'>,
  ) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      ...infoValues,
      step: (prevValues.step as number) + 1,
    }))
  }

  const handleCardInfoChange = (
    cardInfoValues: Pick<ApplyValues, 'isHipass' | 'isMaster' | 'isRf'>,
  ) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      ...cardInfoValues,
      step: (prevValues.step as number) + 1,
    }))
  }

  return (
    <div>
      <ProgressBar progress={(applyValues.step as number) / LAST_STEP} />
      {applyValues.step === 0 ? <Terms onNext={handleTermsChange} /> : null}
      {applyValues.step === 1 ? (
        <BasicInfo onNext={handleBasicInfoChange} />
      ) : null}
      {applyValues.step === 2 ? (
        <CardInfo onNext={handleCardInfoChange} />
      ) : null}
    </div>
  )
}

export default Apply
