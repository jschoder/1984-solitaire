import { useDraggable } from '@dnd-kit/core'
import CardImage from '~/components/CardImage'
import type { Card } from '~/types/card'
import type { CardPlacement } from '~/types/cardPlacement'

type PlayingCardProps = {
  card: Card
  placement?: CardPlacement
  topOnly?: boolean
}

const PlayingCard = ({
  card,
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
        className={`${topOnly ? 'overflow-hidden aspect-[4/1] -mb-2' : ''}`}
        {...(card.faceUp ? listeners : [])}
        {...(card.faceUp ? attributes : [])}
      >
        {<CardImage card={card} />}
      </div>
    </>
  )
}

export default PlayingCard
