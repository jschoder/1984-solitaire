import Counter from '~/components/Counter'
import ShuffleButton from '~/components/ShuffleButton'
import useStore, { GameState } from '~/model/Game'

const Controls = () => {
  const counterState = useStore((state: GameState) => state.counter)
  const shufflePile = useStore((state: GameState) => state.shufflePile)
  return (
    <div className='flex flex-col justify-evenly px-2 bg-controls-bg rounded-lg'>
      <Counter count={counterState} />
      <ShuffleButton onClick={shufflePile} />
    </div>
  )
}

export default Controls
