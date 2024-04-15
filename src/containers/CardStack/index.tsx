import { useDroppable } from '@dnd-kit/core'
import CardImage from '~/components/CardImage'
import PlayingCard from '~/components/PlayingCard'
import type { Card } from '~/types/card'
import type { CardPlacement } from '~/types/cardPlacement'

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
    id: placement.area + ('stack' in placement ? '-' + placement.stack : ''),
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
