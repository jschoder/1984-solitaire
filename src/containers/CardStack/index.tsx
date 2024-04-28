import { useDroppable } from '@dnd-kit/core'
import CardImage from '~/components/CardImage'
import PlayingCard from '~/components/PlayingCard'
import useStore, { GameState } from '~/model/Game'
import type { Card } from '~/types/card'
import type { CardPlacement } from '~/types/cardPlacement'

type CardStackProps = {
  activeDrag?: {
    cards: Card[]
    placement: CardPlacement
  }
  cards: Card[]
  droppable?: boolean
  flatStack?: boolean
  onClick?: () => void
  placement: CardPlacement
}

const CardStack = ({
  activeDrag,
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
  const canDrop = useStore((state: GameState) => state.canDrop)
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
          cardBelowFaceUp={index === 0 ? undefined : cards[index - 1].faceUp}
          placement={placement}
          topOnly={index !== cards.length - 1}
        />
      ))
    )

  return (
    <div
      ref={droppable ? droppableRef : undefined}
      className={`flex flex-col
      ${
        isOver &&
        activeDrag &&
        canDrop(activeDrag.cards, activeDrag.placement, placement)
          ? 'opacity-80'
          : ''
      } ${cards.length > 0 ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default CardStack
