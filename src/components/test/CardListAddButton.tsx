import Button from '@shared/Button'
import { collection, doc, writeBatch } from 'firebase/firestore'
import { store } from '@remote/firebase'
import { COLLECTIONS } from '@constants'
import { card_list } from '@/mock/data'
function CardListAddButton() {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)
    card_list.forEach((card) => {
      const docRef = doc(collection(store, COLLECTIONS.CARD))
      batch.set(docRef, card)
    })

    await batch.commit()
    alert('카드 리스트 추가 완료!')
  }

  return <Button onClick={handleButtonClick}>카드 리스트 추가하기</Button>
}
export default CardListAddButton
