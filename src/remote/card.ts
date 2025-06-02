import { collection, getDocs } from 'firebase/firestore'
import { COLLECTIONS } from '@constants'
import { store } from '@remote/firebase'
import { Card } from '@models/card'

async function getCards() {
  const cardSnapshot = await getDocs(collection(store, COLLECTIONS.CARD))

  return cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))
}

export default getCards
