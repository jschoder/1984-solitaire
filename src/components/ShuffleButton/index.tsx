import ShuffleText from '~/assets/newgame.svg?react'

type ShuffleButtonProps = {
  onClick: () => void
}

function ShuffleButton({ onClick }: ShuffleButtonProps) {
  return (
    <div className='bg-gray-500 md:bg-transparent md:bg-gradient-to-t from-transparent to-gray-500 p-[1px] rounded-md'>
      <button
        className='w-full rounded-md bg-button-bg px-1 py-1.5 md:py-3 active:shadow-inset border-2 border-gray-900'
        onClick={onClick}
      >
        <ShuffleText className='fill-button-text max-w-[70px] mx-auto' />
      </button>
    </div>
  )
}

export default ShuffleButton
