import type { Card, CardPlacement } from '~/types/card'
import CardImage from '~/components/CardImage'
import useStore, { GameState } from '../../model/Game'

type CardDragPreviewProps = {
  card: Card
  placement: CardPlacement
}

const CardDragPreview = ({ card, placement }: CardDragPreviewProps) => {
  const cards = useStore((state: GameState) => {
    const cardList =
      'index' in placement
        ? state[placement.stack][placement.index]
        : state[placement.stack]
    return cardList.slice(cardList.indexOf(card))
  })

  return (
    <>
      {cards.map((card, index) =>
        index === cards.length - 1 ? (
          <CardImage card={card} />
        ) : (
          <div className="overflow-hidden aspect-[4/1] -mb-2">
            <CardImage card={card} />
          </div>
        ),
      )}
    </>
  )
}

export default CardDragPreview
