import React from 'react'
import FlatCardStack from '../FlatCardStack'
import LayeredCardStack from '../LayeredCardStack'
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
        <FlatCardStack
          key={`foundation-${index}`}
          cards={foundationStack}
          topCardVisible={true}
        ></FlatCardStack>
      ))}
      <div />
      <FlatCardStack key="waste" cards={wasteState} topCardVisible={true} />
      <FlatCardStack
        key="stock"
        cards={stockState}
        topCardVisible={false}
        onClick={cycleStock}
      />
      {tableauState.map((tableauStack, index) => (
        <LayeredCardStack
          key={`tableau-${index}`}
          hiddenCards={tableauStack.hidden}
          visibleCards={tableauStack.visible}
        />
      ))}
    </div>
  )
}

export default BoardLayout
