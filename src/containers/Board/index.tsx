import { DndContext, DragOverlay } from '@dnd-kit/core'
import React from 'react'
import DistressingSvg from '~/assets/distressing.svg?react'
import GitHubSvg from '~/assets/github.svg?react'
import HighscoreSvg from '~/assets/highscore.svg?react'
import CardDragPreview from '~/components/CardDragPreview'
import CardStack from '~/containers/CardStack'
import Controls from '~/containers/Controls'
import HighscoreOverlay from '~/containers/HighscoreOverlay'
import i18n from '~/i18n'
import useStore, { GameState } from '~/model/Game'
import { addHighscore, hasHighscore } from '~/model/Highscore'
import type { Card } from '~/types/card'
import type { CardPlacement } from '~/types/cardPlacement'

const Board = () => {
  const [activeDrag, setActiveDrag] = React.useState<
    | {
        cards: Card[]
        placement: CardPlacement
      }
    | undefined
  >()
  const [highscoreOpen, setHighscoreOpen] = React.useState(false)
  const [highscoreExists, setHighscoreExists] = React.useState(false)

  const counter = useStore((state: GameState) => state.counter)
  const drawState = useStore((state: GameState) => state.draw)
  const foundationState = useStore((state: GameState) => state.foundation)
  const stockState = useStore((state: GameState) => state.stock)
  const tableauState = useStore((state: GameState) => state.tableau)
  const won = useStore((state: GameState) => state.isWon())

  const canDrop = useStore((state: GameState) => state.canDrop)
  const drawCard = useStore((state: GameState) => state.drawCard)
  const getPartialStack = useStore((state: GameState) => state.getPartialStack)
  const moveCard = useStore((state: GameState) => state.moveCard)

  React.useEffect(() => {
    hasHighscore().then(setHighscoreExists)
  }, [])

  return (
    <div className='relative'>
      <DndContext
        onDragStart={({ active }) => {
          if (won) {
            return
          }

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
              if (won) {
                addHighscore(counter)
                setHighscoreExists(true)
                setHighscoreOpen(true)
              }

              addHighscore(Math.ceil(counter / 2))
              setHighscoreExists(true)
              //setHighscoreOpen(true)
            }
          }
          setActiveDrag(undefined)
        }}
      >
        <div className='max-w-6xl mx-auto grid grid-cols-7 grid-rows-auto gap-4 p-4'>
          {foundationState.map((foundationStack, stack) => (
            <CardStack
              activeDrag={activeDrag}
              cards={foundationStack}
              droppable
              flatStack
              key={`foundation-${stack}`}
              placement={{ area: 'foundation', stack }}
            />
          ))}
          <Controls />
          <CardStack
            activeDrag={activeDrag}
            cards={drawState}
            flatStack
            key='draw'
            onClick={drawState.length === 0 ? drawCard : undefined}
            placement={{ area: 'draw' }}
          />
          <CardStack
            activeDrag={activeDrag}
            cards={stockState}
            flatStack
            key='stock'
            onClick={drawCard}
            placement={{ area: 'stock' }}
          />
          {tableauState.map((tableauStack, stack) => (
            <CardStack
              activeDrag={activeDrag}
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
      {highscoreOpen && (
        <HighscoreOverlay onClose={() => setHighscoreOpen(false)} />
      )}
      <div className='fixed bottom-0 left-0 flex gap-4 bg-gray-900/[.6] text-white py-2 px-4 rounded-tr-xl'>
        <a
          href='https://github.com/jschoder/Solitaire-Ingsoc'
          target='_blank'
          title={i18n.t('Footer.github')}
        >
          <GitHubSvg className='w-6 h-6 fill-white' />
        </a>
        {highscoreExists && (
          <a
            onClick={() => setHighscoreOpen(true)}
            title={i18n.t('Footer.highscore')}
          >
            <HighscoreSvg className='w-6 h-6 fill-white cursor-pointer' />
          </a>
        )}
      </div>
    </div>
  )
}

export default Board
