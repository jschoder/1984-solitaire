import { useMediaQuery } from 'react-responsive'
import tailwindConfig from '~/../tailwind.config.ts'
import CardImage from '~/components/CardImage'
import type { Card } from '~/types/card'
import { cardTopRadio, mobileCardTopRadio } from '../PlayingCard'

type CardDragPreviewProps = {
  cards: Card[]
}

const CardDragPreview = ({ cards }: CardDragPreviewProps) => {
  const isTablet = useMediaQuery({
    query: `(min-width: ${tailwindConfig.theme.extend.screens.md})`,
  })
  return (
    <>
      {cards.map((card, index) => (
        <div
          className={
            index === cards.length - 1
              ? undefined
              : 'overflow-hidden ' +
                (isTablet ? cardTopRadio : mobileCardTopRadio)
          }
          key={`partial-card-${index}`}
        >
          <CardImage
            card={card}
            cardBelowFaceUp={index > 0 ? cards[index - 1].faceUp : undefined}
          />
        </div>
      ))}
    </>
  )
}

export default CardDragPreview
