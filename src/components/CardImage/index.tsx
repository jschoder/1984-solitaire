import { ReactNode } from 'react'
import type { Card } from '~/types/card'
import { ACE, JACK, KING, QUEEN } from '~/types/card'
import { distressCardElement } from '~/utils/svg'
// All used assets have to be based on an svg with a viewBox of `0 0 100 100` using either full width, height or both
import characterAssets from '~/assets/characters'
import aceAsset from './assets/ace'
import logoAsset from './assets/logo'
import suitAsset from './assets/suits'
import layout, { ace, cardBack, cardCorners, court, numbered } from './layout'

const CHARACTERS = {
  1: characterAssets['A'],
  2: characterAssets['2'],
  3: characterAssets['3'],
  4: characterAssets['4'],
  5: characterAssets['5'],
  6: characterAssets['6'],
  7: characterAssets['7'],
  8: characterAssets['8'],
  9: characterAssets['9'],
  10: characterAssets['10'],
  11: characterAssets['J'],
  12: characterAssets['Q'],
  13: characterAssets['K'],
}

const rescaleElement = (
  element: ReactNode,
  x: number,
  y: number,
  width: number,
  rotate: boolean = false,
  key?: string,
) => (
  <g
    key={key}
    transform={`translate(${x}, ${y}) scale(${width / 100}) ${rotate ? 'rotate(180 50 50)' : ''}`}
  >
    {element}
  </g>
)

const getCenterElements = (card: Card) => {
  if (card.value === ACE) {
    return rescaleElement(<>{aceAsset}</>, ace.x, ace.y, ace.size)
  } else if (
    card.value === JACK ||
    card.value === QUEEN ||
    card.value === KING
  ) {
    const { top, bottom, left, right } = court.dimensions
    return (
      <>
        {rescaleElement(CHARACTERS[card.value], left, top, court.size, false)}
        <path
          style={{
            stroke: 'var(--secondary-color)',
            strokeWidth: court.stroke,
            strokeLinecap: 'round',
          }}
          d={`M ${right},${top} ${left},${bottom}`}
        />
        {rescaleElement(
          CHARACTERS[card.value],
          right - court.size,
          bottom - court.size,
          court.size,
          true,
        )}
      </>
    )
  } else {
    return (
      <>
        {numbered.grid[card.value].map((icon, index) =>
          rescaleElement(
            suitAsset[card.suit],
            icon[0],
            icon[1],
            numbered.size,
            icon[2],
            'icon' + index,
          ),
        )}
      </>
    )
  }
}

type CardImageProps = {
  card?: Card
  cardBelowFaceUp?: boolean
}

const CardImage = ({ card, cardBelowFaceUp }: CardImageProps) => {
  if (!card) {
    return (
      <div className='rounded-lg overflow-hidden border border-white'>
        <svg viewBox={`0 0 ${layout.width} ${layout.height}`}></svg>
      </div>
    )
  }

  // TODO border-gray-800 rounded-lg

  const svg = card.faceUp ? (
    <svg
      style={
        {
          '--primary-color':
            card.suit === 'hearts' || card.suit === 'diamonds'
              ? 'var(--cards-red)'
              : 'var(--cards-black)',
          '--secondary-color':
            card.suit === 'hearts' || card.suit === 'diamonds'
              ? 'var(--cards-black)'
              : 'var(--cards-red)',
        } as React.CSSProperties
      }
      viewBox={`0 0 ${layout.width} ${layout.height}`}
    >
      {cardCorners.characters.map(({ x, y, size, rotate }, index) =>
        rescaleElement(
          CHARACTERS[card.value],
          x,
          y,
          size,
          rotate,
          'cornerCharacter' + index,
        ),
      )}
      {cardCorners.suits.map(({ x, y, size, rotate }, index) =>
        rescaleElement(
          suitAsset[card.suit],
          x,
          y,
          size,
          rotate,
          'cornerSuit' + index,
        ),
      )}
      {getCenterElements(card)}
      {distressCardElement(
        'var(--cards-front)',
        card.distress.front.x,
        card.distress.front.y,
        layout.width,
        layout.height,
      )}
    </svg>
  ) : (
    <svg viewBox={`0 0 ${layout.width} ${layout.height}`}>
      {rescaleElement(logoAsset, cardBack.x, cardBack.y, cardBack.size)}
      {distressCardElement(
        'var(--cards-back)',
        card.distress.back.x,
        card.distress.back.y,
        layout.width,
        layout.height,
      )}
    </svg>
  )

  return (
    <div className='relative '>
      {cardBelowFaceUp !== undefined && (
        <div
          className='absolute top-0 left-0 right-0 h-1/2 z-[-1] border-l border-r border-gray-800'
          style={{
            background: cardBelowFaceUp
              ? 'var(--cards-front)'
              : 'var(--cards-back)',
          }}
        />
      )}
      <div
        className='rounded-lg overflow-hidden border border-gray-800'
        style={{
          background: card.faceUp ? 'var(--cards-front)' : 'var(--cards-back)',
        }}
      >
        {svg}
      </div>
    </div>
  )
}

//  border-l-red-500 border-r-red-500 border-1

export default CardImage
