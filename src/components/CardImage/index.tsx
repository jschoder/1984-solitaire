import { ReactNode } from 'react'
import type { Card, CardValue } from '~/types/card'
import characterElements from './characters'
import logoElement from './logo'
import suitElements from './suits'

const WHITE = '#f3efe0'
const RED = '#9f3a36'
const BLACK = '#373635'

// Size of the distress element
const DISTRESS_SIZE = 20

// Padding between elements
const OUTER_PADDING = 20
const MAIN_PADDING_X = 20

// Small icon & character top left and and bottom right
const SMALL_ICON = 40
const SMALL_ICON_GAP = 10

// Suit Icons and spacing for 2-10
const ICON = 90
const ICON_GAP_X = 5
const ICON_GAP_Y = 40

// Letters to show for J/Q/K (11/12/13)
const BIG_ICON = 110
const BIG_ICON_GAP = 20
const BIG_LINE_STROKE = 10

// Total width and height of the viewport
const WIDTH =
  OUTER_PADDING +
  SMALL_ICON +
  MAIN_PADDING_X +
  (ICON + ICON_GAP_X + ICON + ICON_GAP_X + ICON) +
  MAIN_PADDING_X +
  SMALL_ICON +
  OUTER_PADDING
const HEIGHT = Math.round(WIDTH * (880 / 630))

// Area to show the main part of the card (excluding the corners)
const MAIN_X = OUTER_PADDING + SMALL_ICON + MAIN_PADDING_X
const MAIN_Y = (HEIGHT - 4 * ICON - 3 * ICON_GAP_Y) / 2

// Grid for suit icons 2-10
const GRID_X_1 = MAIN_X
const GRID_X_2 = MAIN_X + ICON + ICON_GAP_X
const GRID_X_3 = MAIN_X + ICON + ICON_GAP_X + ICON + ICON_GAP_X

const GRID_Y_1 = MAIN_Y
const GRID_Y_2 = GRID_Y_1 + 0.5 * (ICON + ICON_GAP_Y)
const GRID_Y_2_5 = GRID_Y_1 + 0.67 * (ICON + ICON_GAP_Y)
const GRID_Y_3 = GRID_Y_1 + ICON + ICON_GAP_Y
const GRID_Y_4 = GRID_Y_3 + 0.5 * (ICON + ICON_GAP_Y)
const GRID_Y_5 = GRID_Y_3 + ICON + ICON_GAP_Y
const GRID_Y_6 = GRID_Y_5 + 0.5 * (ICON + ICON_GAP_Y)
const GRID_Y_7 = GRID_Y_5 + ICON + ICON_GAP_Y

// Margin for the party logo
const LOGO_MARGIN = 50

const SUIT_ICONS = {
  1: [],
  2: [
    [GRID_X_2, GRID_Y_2, false],
    [GRID_X_2, GRID_Y_6, true],
  ],
  3: [
    [GRID_X_2, GRID_Y_1, false],
    [GRID_X_2, GRID_Y_4, false],
    [GRID_X_2, GRID_Y_7, true],
  ],
  4: [
    [GRID_X_1, GRID_Y_2, false],
    [GRID_X_3, GRID_Y_2, false],
    [GRID_X_1, GRID_Y_6, true],
    [GRID_X_3, GRID_Y_6, true],
  ],
  5: [
    [GRID_X_1, GRID_Y_1, false],
    [GRID_X_3, GRID_Y_1, false],
    [GRID_X_2, GRID_Y_4, false],
    [GRID_X_1, GRID_Y_7, true],
    [GRID_X_3, GRID_Y_7, true],
  ],
  6: [
    [GRID_X_1, GRID_Y_1, false],
    [GRID_X_3, GRID_Y_1, false],
    [GRID_X_1, GRID_Y_4, false],
    [GRID_X_3, GRID_Y_4, false],
    [GRID_X_1, GRID_Y_7, true],
    [GRID_X_3, GRID_Y_7, true],
  ],
  7: [
    [GRID_X_1, GRID_Y_1, false],
    [GRID_X_3, GRID_Y_1, false],
    [GRID_X_2, GRID_Y_2_5, false],
    [GRID_X_1, GRID_Y_4, false],
    [GRID_X_3, GRID_Y_4, false],
    [GRID_X_1, GRID_Y_7, true],
    [GRID_X_3, GRID_Y_7, true],
  ],
  8: [
    [GRID_X_1, GRID_Y_1, false],
    [GRID_X_3, GRID_Y_1, false],
    [GRID_X_1, GRID_Y_3, false],
    [GRID_X_3, GRID_Y_3, false],
    [GRID_X_1, GRID_Y_5, true],
    [GRID_X_3, GRID_Y_5, true],
    [GRID_X_1, GRID_Y_7, true],
    [GRID_X_3, GRID_Y_7, true],
  ],
  9: [
    [GRID_X_1, GRID_Y_1, false],
    [GRID_X_3, GRID_Y_1, false],
    [GRID_X_1, GRID_Y_3, false],
    [GRID_X_3, GRID_Y_3, false],
    [GRID_X_2, GRID_Y_4, false],
    [GRID_X_1, GRID_Y_5, true],
    [GRID_X_3, GRID_Y_5, true],
    [GRID_X_1, GRID_Y_7, true],
    [GRID_X_3, GRID_Y_7, true],
  ],
  10: [
    [GRID_X_1, GRID_Y_1, false],
    [GRID_X_3, GRID_Y_1, false],
    [GRID_X_2, GRID_Y_2, false],
    [GRID_X_1, GRID_Y_3, false],
    [GRID_X_3, GRID_Y_3, false],
    [GRID_X_1, GRID_Y_5, true],
    [GRID_X_3, GRID_Y_5, true],
    [GRID_X_2, GRID_Y_6, true],
    [GRID_X_1, GRID_Y_7, true],
    [GRID_X_3, GRID_Y_7, true],
  ],
  11: [],
  12: [],
  13: [],
} satisfies Record<CardValue, [number, number, boolean][]>

const rescaleElement = (
  element: ReactNode,
  x: number,
  y: number,
  width: number,
  rotate: boolean,
) => (
  <g
    transform={`translate(${x}, ${y}) scale(${width / 100}) ${rotate ? 'rotate(180 50 50)' : ''}`}
  >
    {element}
  </g>
)

const getCenterElements = (
  card: Card,
  mainColor: string,
  secondaryColor: string,
) => {
  if (card.value === 1) {
    const mainWidth = ICON + ICON_GAP_X + ICON + ICON_GAP_X + ICON
    return rescaleElement(
      <>
        <path
          fill={mainColor}
          d="M50 22.5C30 22.5 11.6 32.5.6 49L0 50l.6.9a59.1 59.1 0 0 0 98.8 0l.6-.9-.6-.9A59 59 0 0 0 50 22.5zm0 5A22.5 22.5 0 0 1 72.5 50 22.5 22.5 0 0 1 50 72.5 22.5 22.5 0 0 1 27.5 50 22.5 22.5 0 0 1 50 27.5z"
        />
        <circle fill={secondaryColor} cx="50" cy="50" r="15" />
      </>,
      MAIN_X,
      (HEIGHT - mainWidth) / 2,
      mainWidth,
      false,
    )
  } else if (card.value >= 2 && card.value <= 10) {
    return (
      <>
        {SUIT_ICONS[card.value].map((icon) =>
          rescaleElement(
            suitElements[card.suit],
            icon[0],
            icon[1],
            ICON,
            icon[2],
          ),
        )}
      </>
    )
  } else if (card.value >= 11 && card.value <= 13) {
    const top = HEIGHT / 2 - BIG_ICON - BIG_ICON_GAP
    const bottom = HEIGHT / 2 + BIG_ICON + BIG_ICON_GAP
    const left = WIDTH / 2 - BIG_ICON - BIG_ICON_GAP
    const right = WIDTH / 2 + BIG_ICON + BIG_ICON_GAP
    return (
      <>
        {rescaleElement(
          characterElements[card.value],
          left,
          top,
          BIG_ICON,
          false,
        )}
        <path
          style={{
            stroke: secondaryColor,
            strokeWidth: BIG_LINE_STROKE,
            strokeLinecap: 'round',
          }}
          d={`M ${right},${top} ${left},${bottom}`}
        />
        {rescaleElement(
          characterElements[card.value],
          WIDTH / 2 + BIG_ICON_GAP,
          HEIGHT / 2 + BIG_ICON_GAP,
          BIG_ICON,
          true,
        )}
      </>
    )
  } else {
    return null
  }
}

const distressCardElement = (color: string, x: number, y: number) => (
  <g
    transform={`translate(${Math.round((DISTRESS_SIZE - WIDTH) * x)}, ${Math.round((DISTRESS_SIZE - HEIGHT) * y)})`}
    style={{ fill: color }}
  >
    <use xlinkHref="#distressing" />
  </g>
)

type CardImageProps = {
  card?: Card
}

const CardImage = ({ card }: CardImageProps) => {
  if (!card) {
    return (
      <div className="rounded-lg overflow-hidden border border-white">
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`}></svg>
      </div>
    )
  }

  if (card.faceUp) {
    const mainColor =
      card.suit === 'heart' || card.suit === 'diamond' ? RED : BLACK
    const secondaryColor =
      card.suit === 'heart' || card.suit === 'diamond' ? BLACK : RED

    return (
      <div className="rounded-lg overflow-hidden border border-gray-800">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          style={{
            color: mainColor,
            backgroundColor: WHITE,
          }}
        >
          {rescaleElement(
            characterElements[card.value],
            OUTER_PADDING,
            OUTER_PADDING,
            SMALL_ICON,
            false,
          )}
          {rescaleElement(
            suitElements[card.suit],
            OUTER_PADDING,
            OUTER_PADDING + SMALL_ICON_GAP + SMALL_ICON,
            SMALL_ICON,
            false,
          )}
          {getCenterElements(card, mainColor, secondaryColor)}
          {rescaleElement(
            suitElements[card.suit],
            WIDTH - OUTER_PADDING - SMALL_ICON,
            HEIGHT - OUTER_PADDING - SMALL_ICON - SMALL_ICON_GAP - SMALL_ICON,
            SMALL_ICON,
            true,
          )}
          {rescaleElement(
            characterElements[card.value],
            WIDTH - OUTER_PADDING - SMALL_ICON,
            HEIGHT - OUTER_PADDING - SMALL_ICON,
            SMALL_ICON,
            true,
          )}
          {distressCardElement(
            WHITE,
            card.distress.front.x,
            card.distress.front.y,
          )}
        </svg>
      </div>
    )
  } else {
    return (
      <div className="rounded-lg overflow-hidden border border-gray-800">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          style={{
            backgroundColor: BLACK,
          }}
        >
          {rescaleElement(
            logoElement,
            LOGO_MARGIN,
            HEIGHT / 2 - WIDTH / 2 + LOGO_MARGIN,
            WIDTH - 2 * LOGO_MARGIN,
            false,
          )}
          {distressCardElement(
            BLACK,
            card.distress.back.x,
            card.distress.back.y,
          )}
        </svg>
      </div>
    )
  }
}

export default CardImage
