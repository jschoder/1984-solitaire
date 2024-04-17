import CardImage from '~/components/CardImage'
import type { Card } from '~/types/card'

type CardDragPreviewProps = {
  cards: Card[]
}

const CardDragPreview = ({ cards }: CardDragPreviewProps) => {
  return (
    <>
      {cards.map((card, index) =>
        index === cards.length - 1 ? (
          <CardImage card={card} key='main-card' />
        ) : (
          <div
            className='overflow-hidden aspect-[4/1] -mb-2'
            key={`partial-card-${index}`}
          >
            <CardImage card={card} />
          </div>
        ),
      )}
    </>
  )
}

export default CardDragPreview
