import React from 'react'
import type { Card, CardPlacement } from '~/types/card'
import CardImage from '~/components/CardImage'
import CardBackSvg from '~/assets/cards/back.svg?react'
import useStore, { GameState } from '../../ model/Game'

import { useDrag } from 'react-dnd'

/*
const cardSource = {
  beginDrag: (props: any, monitor: DragSourceMonitor) => ({
    card: props.card,
  }),
}
*/

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
  const moveCard = useStore((state: GameState) => state.moveCard)

  const [, drag] = useDrag(() => ({
    type: 'CARD',
    item: card,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<CardPlacement>()
      if (item && placement && dropResult) {
        // console.log('DROPPED', card, dropResult)
        moveCard(item, placement, dropResult)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))

  return (
    <div
      ref={drag}
      className={`${topOnly ? 'overflow-hidden aspect-[4/1] -mb-2' : ''}`}
    >
      <div className="rounded-lg overflow-hidden border border-gray-800">
        {card.faceUp ? <CardImage card={card} /> : <CardBackSvg />}
      </div>
    </div>
  )
}

export default PlayingCard
