import React from 'react'
import CardStack from '../CardStack'
import PlayingCard from '../../components/PlayingCard'
import useStore, { GameState } from '../../ model/Game'

const BoardLayout = () => {
  const foundationState = useStore((state: GameState) => state.foundation)
  const stockState = useStore((state: GameState) => state.stock)
  const wasteState = useStore((state: GameState) => state.waste)
  const tableauState = useStore((state: GameState) => state.tableau)

  const cycleStock = useStore((state: GameState) => state.cycleStock)
  const shufflePile = useStore((state: GameState) => state.shufflePile)

  React.useEffect(() => {
    shufflePile()
  }, [])

  return (
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
  )
}

export default BoardLayout
