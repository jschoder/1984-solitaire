import { Card, CardPlacement } from '../../types/card'
import { useDroppable } from '@dnd-kit/core'

import PlayingCard from '../../components/PlayingCard'
import CardImage from '~/components/CardImage'

type CardStackProps = {
  cards: Card[]
  droppable?: boolean
  flatStack?: boolean
  onClick?: () => void
  placement: CardPlacement
}

const CardStack = ({
  cards,
  droppable = false,
  flatStack = false,
  onClick,
  placement,
}: CardStackProps) => {
  const { isOver, setNodeRef: droppableRef } = useDroppable({
    id: placement.stack + ('index' in placement ? '-' + placement.index : ''),
    data: {
      placement,
    },
  })

  const children =
    cards.length === 0 ? (
      <CardImage />
    ) : flatStack ? (
      <PlayingCard card={cards[cards.length - 1]} placement={placement} />
    ) : (
      cards.map((card, index) => (
        <PlayingCard
          key={`card-${index}`}
          card={card}
          placement={placement}
          topOnly={index !== cards.length - 1}
        />
      ))
    )

  return (
    <div
      ref={droppable ? droppableRef : undefined}
      className={`flex flex-col ${droppable && isOver ? 'opacity-80' : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default CardStack
