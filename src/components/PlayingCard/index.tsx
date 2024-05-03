import { useDraggable } from '@dnd-kit/core'
import { useMediaQuery } from 'react-responsive'
import tailwindConfig from '~/../tailwind.config.ts'
import CardImage from '~/components/CardImage'
import type { Card } from '~/types/card'
import type { CardPlacement } from '~/types/cardPlacement'

export const cardTopRadio = 'aspect-[5/1]'
export const mobileCardTopRadio = 'aspect-[7/2]'

type PlayingCardProps = {
  card: Card
  cardBelowFaceUp?: boolean
  placement?: CardPlacement
  topOnly?: boolean
}

const PlayingCard = ({
  card,
  cardBelowFaceUp,
  placement,
  topOnly = false,
}: PlayingCardProps) => {
  const isTableOrAbove = useMediaQuery({
    query: `(min-width: ${tailwindConfig.theme.extend.screens.md})`,
  })
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
        className={`${topOnly ? 'overflow-hidden ' + (isTableOrAbove ? cardTopRadio : mobileCardTopRadio) : ''}`}
        {...(card.faceUp ? listeners : [])}
        {...(card.faceUp ? attributes : [])}
      >
        {<CardImage card={card} cardBelowFaceUp={cardBelowFaceUp} />}
      </div>
    </>
  )
}

export default PlayingCard
