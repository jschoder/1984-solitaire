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

  const foundationState = useStore((state: GameState) => state.foundation)
  const stockState = useStore((state: GameState) => state.stock)
  const wasteState = useStore((state: GameState) => state.waste)
  const tableauState = useStore((state: GameState) => state.tableau)

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
            moveCard(
              active.data.current.card,
              active.data.current.placement,
              over.data.current.placement,
            )
          }
        }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-7 grid-rows-auto gap-4 p-4">
          {foundationState.map((foundationStack, index) => (
            <CardStack
              key={`foundation-${index}`}
              cards={foundationStack}
              placement={{ stack: 'foundation', index }}
              flatStack
            />
          ))}
          <div />
          <CardStack
            key="waste"
            cards={wasteState}
            placement={{ stack: 'waste' }}
            onClick={wasteState.length === 0 ? cycleStock : undefined}
            flatStack
          />
          <CardStack
            key="stock"
            cards={stockState}
            placement={{ stack: 'stock' }}
            onClick={cycleStock}
            flatStack
          />
          {tableauState.map((tableauStack, index) => (
            <CardStack
              key={`tableau-${index}`}
              cards={tableauStack}
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
