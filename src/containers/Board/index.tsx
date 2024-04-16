import { DndContext, DragOverlay } from '@dnd-kit/core'
import React from 'react'
import DistressingSvg from '~/assets/distressing.svg?react'
import CardDragPreview from '~/components/CardDragPreview'
import CardStack from '~/containers/CardStack'
import useStore, { GameState } from '~/model/Game'
import type { Card } from '~/types/card'
import type { CardPlacement } from '~/types/cardPlacement'

const BoardLayout = () => {
  const [activeDrag, setActiveDrag] = React.useState<
    | {
        card: Card
        placement: CardPlacement
      }
    | undefined
  >()

  const drawState = useStore((state: GameState) => state.draw)
  const foundationState = useStore((state: GameState) => state.foundation)
  const stockState = useStore((state: GameState) => state.stock)
  const tableauState = useStore((state: GameState) => state.tableau)

  const canDrop = useStore((state: GameState) => state.canDrop)
  const drawCard = useStore((state: GameState) => state.drawCard /*  */)
  const moveCard = useStore((state: GameState) => state.moveCard)
  const shufflePile = useStore((state: GameState) => state.shufflePile)

  React.useEffect(() => {
    shufflePile()
  }, [])

  return (
    <>
      <DndContext
        onDragStart={({ active }) => {
          if (active?.data?.current) {
            setActiveDrag(
              active?.data?.current as { card: Card; placement: CardPlacement },
            )
          }
        }}
        onDragEnd={(event) => {
          const { active, over } = event
          setActiveDrag(undefined)
          if (active?.data?.current && over?.data?.current) {
            const card = active.data.current.card
            const from = active.data.current.placement
            const to = over.data.current.placement
            if (canDrop(card, from, to)) {
              moveCard(card, from, to)
            }
          }
        }}
      >
        <div className='max-w-6xl mx-auto grid grid-cols-7 grid-rows-auto gap-4 p-4'>
          {foundationState.map((foundationStack, stack) => (
            <CardStack
              cards={foundationStack}
              droppable
              flatStack
              key={`foundation-${stack}`}
              placement={{ area: 'foundation', stack }}
            />
          ))}
          <div />
          <CardStack
            cards={drawState}
            flatStack
            key='draw'
            onClick={drawState.length === 0 ? drawCard : undefined}
            placement={{ area: 'draw' }}
          />
          <CardStack
            cards={stockState}
            flatStack
            key='stock'
            onClick={drawCard}
            placement={{ area: 'stock' }}
          />
          {tableauState.map((tableauStack, stack) => (
            <CardStack
              cards={tableauStack}
              droppable
              key={`tableau-${stack}`}
              placement={{ area: 'tableau', stack }}
            />
          ))}
        </div>
        {activeDrag && (
          <DragOverlay>
            {activeDrag.card && (
              <CardDragPreview
                card={activeDrag.card}
                placement={activeDrag.placement}
              />
            )}
          </DragOverlay>
        )}
      </DndContext>
      <DistressingSvg />
    </>
  )
}

export default BoardLayout
