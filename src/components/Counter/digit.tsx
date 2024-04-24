import React from 'react'
import characterAssets from '~/assets/characters'
import { distressCardElement } from '~/utils/svg'

type DigitProps = {
  col: number
  value: number
}

const ratio = 'aspect-[3/4]'
const bufferBefore = 20
const bufferAfter = 5

const Digit = ({ value, col }: DigitProps) => {
  const [height, setHeight] = React.useState<number>(0)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        setHeight(ref.current.offsetHeight)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const startPoint = Math.max(0, value - bufferBefore)
  const numberElements = []
  for (let i = startPoint; i < value + bufferAfter; i++) {
    numberElements.push(
      <div
        key={i}
        className={'flex flex-col justify-center bg-counter-bg ' + ratio}
        style={{ height }}
      >
        <svg viewBox={`0 0 100 100`}>
          {characterAssets[i % 10] || <></>}
          {distressCardElement(
            'var(--counter-bg)',
            (i % 10) / 10,
            col / 4,
            100,
            100,
          )}
        </svg>
      </div>,
    )
  }

  return (
    <div
      ref={ref}
      className={'overflow-hidden relative flex-grow rounded-md ' + ratio}
    >
      {height && (
        <div
          style={{ top: -1 * height * value + 'px' }}
          className='absolute w-full z-index-[-1] transition-top duration-[1000ms] mech-in-out'
        >
          <div
            className='absolute w-full'
            style={{ top: height * startPoint + 'px' }}
          >
            {numberElements}
          </div>
        </div>
      )}
      <div className='absolute top-0 right-0 bottom-0 left-0 z-10 shadow-inset'></div>
    </div>
  )
}

export default Digit
