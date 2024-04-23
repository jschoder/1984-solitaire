import { useDraggable } from '@dnd-kit/core'
import CardImage from '~/components/CardImage'
import type { Card } from '~/types/card'
import type { CardPlacement } from '~/types/cardPlacement'

export const cardTopRadio = 'aspect-[5/1]'

type PlayingCardProps = {
  card: Card
  cardBelowFaceUp?: boolean
  placement?: CardPlacement
  topOnly?: boolean
}

const PlayingCard = ({
  card,
  cardBelowFaceUp,
  placement,
  topOnly = false,
}: PlayingCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef: cardDragRef,
  } = useDraggable({
    id: card.suit + '-' + card.value,
    data: {
      card,
      placement,
    },
  })

  return (
    <>
      <div
        ref={card.faceUp ? cardDragRef : undefined}
        className={`${topOnly ? 'overflow-hidden ' + cardTopRadio : ''}`}
        {...(card.faceUp ? listeners : [])}
        {...(card.faceUp ? attributes : [])}
      >
        {<CardImage card={card} cardBelowFaceUp={cardBelowFaceUp} />}
      </div>
    </>
  )
}

export default PlayingCard
