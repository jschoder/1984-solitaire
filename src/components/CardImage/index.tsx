import { ReactNode } from 'react'
import type { Card } from '~/types/card'
import { ACE, JACK, KING, QUEEN } from '~/types/card'
// All used assets have to be based on an svg with a viewBox of `0 0 100 100` using either full width, height or both
import aceAsset from './assets/ace'
import characterAssets from './assets/characters'
import logoAsset from './assets/logo'
import suitAsset from './assets/suits'

import layout, { ace, cardBack, cardCorners, court, numbered } from './layout'

// Viewbox width and height of ~/assets/distressing.svg
const DISTRESS_SIZE = {
  height: 2500,
  width: 2500,
} as const

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
        {rescaleElement(
          characterAssets[card.value],
          left,
          top,
          court.size,
          false,
        )}
        <path
          style={{
            stroke: 'var(--secondary-color)',
            strokeWidth: court.stroke,
            strokeLinecap: 'round',
          }}
          d={`M ${right},${top} ${left},${bottom}`}
        />
        {rescaleElement(
          characterAssets[card.value],
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

const distressCardElement = (color: string, x: number, y: number) => (
  <g
    style={{ fill: color }}
    transform={`translate(${Math.round((DISTRESS_SIZE.width - layout.width) * -x)}, ${Math.round((DISTRESS_SIZE.height - layout.height) * -y)})`}
  >
    <use xlinkHref='#distressing' />
  </g>
)

type CardImageProps = {
  card?: Card
}

const CardImage = ({ card }: CardImageProps) => {
  if (!card) {
    return (
      <div className='rounded-lg overflow-hidden border border-white'>
        <svg viewBox={`0 0 ${layout.width} ${layout.height}`}></svg>
      </div>
    )
  }

  if (card.faceUp) {
    return (
      <div className='rounded-lg overflow-hidden border border-gray-800'>
        <svg
          viewBox={`0 0 ${layout.width} ${layout.height}`}
          style={
            {
              background: 'var(--cards-front)',
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
        >
          {cardCorners.characters.map(({ x, y, size, rotate }, index) =>
            rescaleElement(
              characterAssets[card.value],
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
          )}
        </svg>
      </div>
    )
  } else {
    return (
      <div className='rounded-lg overflow-hidden border border-gray-800'>
        <svg
          style={{ background: 'var(--cards-back)' }}
          viewBox={`0 0 ${layout.width} ${layout.height}`}
        >
          {rescaleElement(logoAsset, cardBack.x, cardBack.y, cardBack.size)}
          {distressCardElement(
            'var(--cards-back)',
            card.distress.back.x,
            card.distress.back.y,
          )}
        </svg>
      </div>
    )
  }
}

export default CardImage
