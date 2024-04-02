import React from 'react'
import CardStack from '../CardStack'
import CardDragPreview from '~/components/CardDragPreview'
import type { Card, CardPlacement } from '~/types/card'
import useStore, { GameState } from '../../model/Game'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import DistressingSvg from '~/assets/distressing.svg?react'

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
  const cycleStock = useStore((state: GameState) => state.cycleStock)
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
          {foundationState.map((foundationStack, index) => (
            <CardStack
              cards={foundationStack}
              droppable
              flatStack
              key={`foundation-${index}`}
              placement={{ stack: 'foundation', index }}
            />
          ))}
          <div />
          <CardStack
            cards={drawState}
            flatStack
            key='draw'
            onClick={drawState.length === 0 ? cycleStock : undefined}
            placement={{ stack: 'draw' }}
          />
          <CardStack
            cards={stockState}
            flatStack
            key='stock'
            onClick={cycleStock}
            placement={{ stack: 'stock' }}
          />
          {tableauState.map((tableauStack, index) => (
            <CardStack
              cards={tableauStack}
              droppable
              key={`tableau-${index}`}
              placement={{ stack: 'tableau', index }}
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
