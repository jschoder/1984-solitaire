import type { Card, CardPlacement } from '~/types/card'
import CardImage from '~/components/CardImage'

import { useDraggable } from '@dnd-kit/core'

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
    id: card.face + '-' + card.value,
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
        {...listeners}
        {...attributes}
      >
        <div className="rounded-lg overflow-hidden border border-gray-800">
          {card.faceUp ? <CardImage card={card} /> : <CardImage />}
        </div>
      </div>
    </>
  )
}

export default PlayingCard
