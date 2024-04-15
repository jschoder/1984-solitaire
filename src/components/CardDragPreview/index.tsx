import CardImage from '~/components/CardImage'
import useStore, { GameState } from '~/model/Game'
import type { Card } from '~/types/card'
import type { CardPlacement } from '~/types/cardPlacement'

type CardDragPreviewProps = {
  card: Card
  placement: CardPlacement
}

const CardDragPreview = ({ card, placement }: CardDragPreviewProps) => {
  const cards = useStore((state: GameState) => {
    const stack =
      'stack' in placement
        ? state[placement.area][placement.stack]
        : state[placement.area]
    return stack.slice(stack.indexOf(card))
  })

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
