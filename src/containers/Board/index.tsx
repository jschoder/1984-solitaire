import { DndContext, DragOverlay } from '@dnd-kit/core'
import React from 'react'
import DistressingSvg from '~/assets/distressing.svg?react'
import CardDragPreview from '~/components/CardDragPreview'
import CardStack from '~/containers/CardStack'
import Controls from '~/containers/Controls'
import useStore, { GameState } from '~/model/Game'
import type { Card } from '~/types/card'
import type { CardPlacement } from '~/types/cardPlacement'

const BoardLayout = () => {
  const [activeDrag, setActiveDrag] = React.useState<
    | {
        cards: Card[]
        placement: CardPlacement
      }
    | undefined
  >()

  const drawState = useStore((state: GameState) => state.draw)
  const foundationState = useStore((state: GameState) => state.foundation)
  const stockState = useStore((state: GameState) => state.stock)
  const tableauState = useStore((state: GameState) => state.tableau)

  const canDrop = useStore((state: GameState) => state.canDrop)
  const drawCard = useStore((state: GameState) => state.drawCard)
  const getPartialStack = useStore((state: GameState) => state.getPartialStack)
  const moveCard = useStore((state: GameState) => state.moveCard)

  React.useEffect(() => {
    // TODO shuffle only one first load
    // shufflePile()
  }, [])

  // TODO design shuffle button + counter
  return (
    <>
      <DndContext
        onDragStart={({ active }) => {
          if (active?.data?.current) {
            const { card, placement } = active.data.current
            setActiveDrag({
              cards: getPartialStack(card, placement),
              placement,
            })
          }
        }}
        onDragEnd={(event) => {
          const { over } = event
          if (activeDrag && over?.data?.current) {
            const to = over.data.current.placement
            if (canDrop(activeDrag.cards, activeDrag.placement, to)) {
              moveCard(activeDrag.cards, activeDrag.placement, to)
            }
          }
          setActiveDrag(undefined)
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
          <Controls />
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
            {activeDrag.cards && <CardDragPreview cards={activeDrag.cards} />}
          </DragOverlay>
        )}
      </DndContext>
      <DistressingSvg style={{ display: 'none' }} />
    </>
  )
}

export default BoardLayout
