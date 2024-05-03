import React, { ReactNode } from 'react'
import { useMediaQuery } from 'react-responsive'
import tailwindConfig from '~/../tailwind.config.ts'
import type { Card } from '~/types/card'
import { ACE, JACK, KING, QUEEN } from '~/types/card'
import { distressCardElement } from '~/utils/svg'
// All used assets have to be based on an svg with a viewBox of `0 0 100 100` using either full width, height or both
import characterAssets from '~/assets/characters'
import aceAsset from './assets/ace'
import logoAsset from './assets/logo'
import suitAsset from './assets/suits'
import calculateLayout from './layout'

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
  size: number,
  rotate: boolean = false,
  key?: string,
) => (
  <g
    key={key}
    transform={`translate(${x}, ${y}) scale(${size / 100}) ${rotate ? 'rotate(180 50 50)' : ''}`}
  >
    {element}
  </g>
)

type CardImageProps = {
  card?: Card
  cardBelowFaceUp?: boolean
}

const CardImage = ({ card, cardBelowFaceUp }: CardImageProps) => {
  const isTableOrAbove = useMediaQuery({
    query: `(min-width: ${tailwindConfig.theme.extend.screens.md})`,
  })
  const isDesktop = useMediaQuery({
    query: `(min-width: ${tailwindConfig.theme.extend.screens.lg})`,
  })
  const cardLayout = React.useMemo(
    () =>
      calculateLayout(
        isDesktop ? 'desktop' : isTableOrAbove ? 'tablet' : 'mobile',
      ),
    [isDesktop, isTableOrAbove],
  )
  const getCenterElements = React.useCallback(() => {
    if (!card) {
      return undefined
    } else if (card.value === ACE) {
      if (!cardLayout.ace) {
        return undefined
      }
      return rescaleElement(
        <>{aceAsset}</>,
        cardLayout.ace.x,
        cardLayout.ace.y,
        cardLayout.ace.size,
      )
    } else if (
      card.value === JACK ||
      card.value === QUEEN ||
      card.value === KING
    ) {
      if (!cardLayout.court) {
        return undefined
      }
      const { top, bottom, left, right } = cardLayout.court.dimensions
      return (
        <>
          {rescaleElement(
            CHARACTERS[card.value],
            left,
            top,
            cardLayout.court.size,
            false,
          )}
          <path
            style={{
              stroke: 'var(--secondary-color)',
              strokeWidth: cardLayout.court.stroke,
              strokeLinecap: 'round',
            }}
            d={`M ${right},${top} ${left},${bottom}`}
          />
          {rescaleElement(
            CHARACTERS[card.value],
            right - cardLayout.court.size,
            bottom - cardLayout.court.size,
            cardLayout.court.size,
            true,
          )}
        </>
      )
    } else {
      if (!cardLayout.numbered) {
        return undefined
      }
      return (
        <>
          {cardLayout.numbered.grid[card.value].map((icon, index) =>
            rescaleElement(
              suitAsset[card.suit],
              icon[0],
              icon[1],
              cardLayout.numbered!.size,
              icon[2],
              'icon' + index,
            ),
          )}
        </>
      )
    }
  }, [card, cardLayout])

  if (!card) {
    return (
      <div className='rounded-lg overflow-hidden border border-white'>
        <svg
          viewBox={`0 0 ${cardLayout.viewBox.width} ${cardLayout.viewBox.height}`}
        ></svg>
      </div>
    )
  }

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
      viewBox={`0 0 ${cardLayout.viewBox.width} ${cardLayout.viewBox.height}`}
    >
      {getCenterElements()}
      {distressCardElement(
        'var(--cards-front)',
        card.distress.front.x,
        card.distress.front.y,
        cardLayout.viewBox.width,
        cardLayout.viewBox.height,
      )}
      {cardLayout.cardCorners.characters.map(({ x, y, size, rotate }, index) =>
        rescaleElement(
          CHARACTERS[card.value],
          x,
          y,
          size,
          rotate,
          'cornerCharacter' + index,
        ),
      )}
      {cardLayout.cardCorners.suits.map(({ x, y, size, rotate }, index) =>
        rescaleElement(
          suitAsset[card.suit],
          x,
          y,
          size,
          rotate,
          'cornerSuit' + index,
        ),
      )}
    </svg>
  ) : (
    <svg
      className='cardImageSvg'
      viewBox={`0 0 ${cardLayout.viewBox.width} ${cardLayout.viewBox.height}`}
    >
      {rescaleElement(
        logoAsset,
        cardLayout.cardBack.x,
        cardLayout.cardBack.y,
        cardLayout.cardBack.size,
      )}
      {isTableOrAbove &&
        distressCardElement(
          'var(--cards-back)',
          card.distress.back.x,
          card.distress.back.y,
          cardLayout.viewBox.width,
          cardLayout.viewBox.height,
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

export default CardImage
