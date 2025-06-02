import Top from '@shared/Top'
import { useEffect } from 'react'
import getCards from '@remote/card'
import { getAdBanners } from '@remote/adBanner'

function HomePage() {
  useEffect(() => {
    getCards().then((result) => {
      console.log(result)
    })
    getAdBanners().then((result) => {
      console.log(result)
    })
  }, [])

  return (
    <div>
      <Top
        title="혜택 좋은 카드"
        subTitle="회원님을 위해서 혜택 좋은 카드를 모아봤어요 "
      />
    </div>
  )
}
export default HomePage
