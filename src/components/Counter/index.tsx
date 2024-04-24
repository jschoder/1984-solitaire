import Digit from './digit'

type CounterProps = {
  count: number
}

const Counter = ({ count }: CounterProps) => {
  const displayedValue = Math.min(count, 999)
  return (
    <div
      className='flex justify-between w-full items-center gap-2'
      style={
        {
          '--primary-color': 'var(--counter-text)',
        } as React.CSSProperties
      }
    >
      <Digit col={0} value={Math.floor(displayedValue / 100)} />
      <Digit col={1} value={Math.floor(displayedValue / 10)} />
      <Digit col={2} value={Math.floor(displayedValue)} />
    </div>
  )
}

export default Counter
