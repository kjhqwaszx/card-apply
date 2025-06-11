import { useQuery } from 'react-query'
import { useInView } from 'react-intersection-observer'

import Skeleton from '@shared/Skeleton'
import Spacing from '@shared/Spacing'

function Review() {
  const { ref, inView } = useInView({
    triggerOnce: true,
  })

  const { data = [], isLoading } = useQuery(
    ['review'],
    () => {
      console.log('Review Query', ref)
      return new Promise<string[]>((resolve) => {
        setTimeout(() => {
          resolve(['너무 좋아요', '꼭 신청하세요 !!'])
        }, 2_000)
      })
    },
    {
      // 뷰포트에 노출되었을 때 호출한다.
      enabled: inView,
    },
  )

  return (
    <div ref={ref}>
      {isLoading ? (
        <>
          <Skeleton width={30} height={10} />
          <Spacing size={3} />
          <Skeleton width={30} height={10} />
        </>
      ) : (
        data.map((review, index) => <div key={index}>{review}</div>)
      )}
    </div>
  )
}

export default Review
