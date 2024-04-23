import CardImage from '~/components/CardImage'
import type { Card } from '~/types/card'
import { cardTopRadio } from '../PlayingCard'

type CardDragPreviewProps = {
  cards: Card[]
}

const CardDragPreview = ({ cards }: CardDragPreviewProps) => {
  return (
    <>
      {cards.map((card, index) => (
        <div
          className={
            index === cards.length - 1
              ? undefined
              : 'overflow-hidden ' + cardTopRadio
          }
          key={`partial-card-${index}`}
        >
          <CardImage
            card={card}
            cardBelowFaceUp={index > 0 ? cards[index - 1].faceUp : undefined}
          />
        </div>
      ))}
    </>
  )
}

export default CardDragPreview
