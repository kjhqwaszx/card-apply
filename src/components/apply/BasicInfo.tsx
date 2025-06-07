import { ChangeEvent, useCallback, useState } from 'react'
import Select from '@shared/Select'

import FixedBottomButton from '@shared/FixedBottomButton'

import {
  annualIncomeOptions,
  creditScoreOptions,
  paymentDateOptions,
} from '@constants/apply'
import { ApplyValues } from '@models/apply'

type InfoValues = Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>

function BasicInfo({ onNext }: { onNext: (infoValues: InfoValues) => void }) {
  const [infoValues, setInfoValues] = useState<InfoValues>({
    salary: '',
    creditScore: '',
    payDate: '',
  })

  const handleInfoChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setInfoValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const isAllChecked = Object.values(infoValues).every((value) => value)

  return (
    <div>
      <Select
        name="salary"
        label="연소득"
        options={annualIncomeOptions}
        placeholder={annualIncomeOptions[0].label}
        value={infoValues.salary}
        onChange={handleInfoChange}
      />
      <Select
        name="creditScore"
        label="신용점수"
        options={creditScoreOptions}
        placeholder={creditScoreOptions[0].label}
        value={infoValues.creditScore}
        onChange={handleInfoChange}
      />
      <Select
        name="payDate"
        label="결제일"
        options={paymentDateOptions}
        placeholder={paymentDateOptions[0].label}
        value={infoValues.payDate}
        onChange={handleInfoChange}
      />

      <FixedBottomButton
        label="다음"
        onClick={() => {
          onNext(infoValues)
        }}
        disabled={isAllChecked === false}
      />
    </div>
  )
}

export default BasicInfo
