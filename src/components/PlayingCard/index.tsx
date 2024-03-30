import React from 'react'
import type { Card } from '~/types/card'
import CardImage from '~/components/CardImage'
import CardBackSvg from '~/assets/cards/back.svg?react'

type PlayingCardProps = {
  card: Card
  visible: boolean
  topOnly?: boolean
}

const PlayingCard = ({ card, visible, topOnly = false }: PlayingCardProps) => {
  return (
    <div className={`${topOnly ? 'overflow-hidden aspect-[4/1] -mb-2' : ''}`}>
      <div className="rounded-sm">
        {visible ? <CardImage card={card} /> : <CardBackSvg />}
      </div>
    </div>
  )
}

export default PlayingCard
