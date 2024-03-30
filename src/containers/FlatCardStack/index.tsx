import React, { ReactNode } from 'react'
import { Card } from '../../types/card'
import CardStack from '../../components/CardStack'
import PlayingCard from '../../components/PlayingCard'

type FlatCardStackProps = {
  cards: Card[]
  topCardVisible: boolean
  onClick?: () => void
}

const FlatCardStack = ({
  cards,
  topCardVisible,
  onClick,
}: FlatCardStackProps) => {
  return (
    <CardStack onClick={onClick}>
      {/*
      TODO  clean up
      cards.map((card) => (
        <div>
          {card.face} {card.value}
        </div>
      ))
      */}
      {cards.length ? (
        <PlayingCard card={cards[cards.length - 1]} visible={topCardVisible} />
      ) : undefined}
    </CardStack>
  )
}

export default FlatCardStack
