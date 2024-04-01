import React from 'react'
import { Card, CardPlacement } from '../../types/card'
import { useDrop } from 'react-dnd'

import PlayingCard from '../../components/PlayingCard'

type CardStackProps = {
  cards: Card[]
  placement?: CardPlacement
  flatStack?: boolean
  onClick?: () => void
}

const CardStack = ({
  cards,
  placement,
  flatStack = false,
  onClick,
}: CardStackProps) => {
  // TODO cleanup
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'CARD',
    drop: () => placement,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  const children =
    cards.length === 0 ? (
      <div className="border border-white rounded-lg h-full"></div>
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
      ref={drop}
      className={`flex flex-col ${isOver ? 'opacity-70' : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default CardStack
