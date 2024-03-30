import React, { ReactNode } from 'react'
import CardStack from '../../components/CardStack'
import type { Card } from '../../types/card'
import PlayingCard from '../../components/PlayingCard'

type LayeredCardStackProps = {
  hiddenCards: Card[]
  visibleCards: Card[]
}

const LayeredCardStack = ({
  hiddenCards,
  visibleCards,
}: LayeredCardStackProps) => {
  return (
    <CardStack>
      {hiddenCards.map((card, index) => (
        <PlayingCard
          key={`hidden-${index}`}
          card={card}
          visible={false}
          topOnly
        />
      ))}
      {visibleCards.map((card, index) => (
        <PlayingCard key={`visible-${index}`} card={card} visible={true} />
      ))}
    </CardStack>
  )
}
export default LayeredCardStack
