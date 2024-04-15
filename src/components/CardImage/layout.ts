import type { CardValue } from '~/types/card'
import { ACE, JACK, KING, QUEEN } from '~/types/card'

/*
 * This file calculates the layout of the card front and back based on constants defined in this file
 * Each value can be changed independently since it only affects the size of the viewBox.
 */

// Standard poker cards have a ratio of 3.5 inches x 2.5 inches
const CARD_RATIO = 35 / 25

// Padding of the card itself and between the corners and the main
const OUTER_PADDING = 20
const MAIN_PADDING_X = 20

// Small suit icon & character top left and and bottom right
const CORNER_ICON = 40
const CORNER_ICON_GAP = 10

// Suit Icons and spacing for 2-10
const ICON = 90
const ICON_GAP_X = 5
const ICON_GAP_Y = 40

const MAIN_WIDTH = ICON + ICON_GAP_X + ICON + ICON_GAP_X + ICON

// Total width and height of the viewbox
const WIDTH =
  2 * OUTER_PADDING + 2 * CORNER_ICON + 2 * MAIN_PADDING_X + MAIN_WIDTH
const HEIGHT = Math.round(WIDTH * CARD_RATIO)

export default {
  width: WIDTH,
  height: HEIGHT,
} as const

export const cardCorners = {
  characters: [
    {
      x: OUTER_PADDING,
      y: OUTER_PADDING,
      size: CORNER_ICON,
      rotate: false,
    },
    {
      x: WIDTH - OUTER_PADDING - CORNER_ICON,
      y: HEIGHT - OUTER_PADDING - CORNER_ICON,
      size: CORNER_ICON,
      rotate: true,
    },
  ],
  suits: [
    {
      x: OUTER_PADDING,
      y: OUTER_PADDING + CORNER_ICON_GAP + CORNER_ICON,
      size: CORNER_ICON,
      rotate: false,
    },
    {
      x: WIDTH - OUTER_PADDING - CORNER_ICON,
      y: HEIGHT - OUTER_PADDING - CORNER_ICON - CORNER_ICON_GAP - CORNER_ICON,
      size: CORNER_ICON,
      rotate: true,
    },
  ],
} as const

// Area to show the main part of the card (excluding the corners)
const MAIN_X = OUTER_PADDING + CORNER_ICON + MAIN_PADDING_X
const MAIN_Y = (HEIGHT - 4 * ICON - 3 * ICON_GAP_Y) / 2

export const ace = {
  x: MAIN_X,
  y: (HEIGHT - MAIN_WIDTH) / 2,
  size: MAIN_WIDTH,
} as const

// Grid for suit icons 2-10
const GRID_X_1 = MAIN_X
const GRID_X_2 = GRID_X_1 + ICON + ICON_GAP_X
const GRID_X_3 = GRID_X_2 + ICON + ICON_GAP_X

const GRID_Y_INCREMENT = 0.5 * (ICON + ICON_GAP_Y)
const GRID_Y_1 = MAIN_Y
const GRID_Y_2 = GRID_Y_1 + GRID_Y_INCREMENT
const GRID_Y_3 = GRID_Y_2 + GRID_Y_INCREMENT
const GRID_Y_4 = GRID_Y_3 + GRID_Y_INCREMENT
const GRID_Y_5 = GRID_Y_4 + GRID_Y_INCREMENT
const GRID_Y_6 = GRID_Y_5 + GRID_Y_INCREMENT
const GRID_Y_7 = GRID_Y_6 + GRID_Y_INCREMENT

export const numbered = {
  grid: {
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
      [GRID_X_2, GRID_Y_2 + 0.5 * GRID_Y_INCREMENT, false],
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
  } as const satisfies Record<
    Exclude<CardValue, typeof ACE | typeof JACK | typeof QUEEN | typeof KING>,
    [number, number, boolean][]
  >,
  size: ICON,
}

// Letters to show for J/Q/K (11/12/13)
const COURT_LETTER = 110
const COURT_LETTER_GAP = 20
const COURT_LINE_STROKE = 10

export const court = {
  dimensions: {
    top: HEIGHT / 2 - COURT_LETTER - COURT_LETTER_GAP,
    bottom: HEIGHT / 2 + COURT_LETTER + COURT_LETTER_GAP,
    left: WIDTH / 2 - COURT_LETTER - COURT_LETTER_GAP,
    right: WIDTH / 2 + COURT_LETTER + COURT_LETTER_GAP,
  },
  size: COURT_LETTER,
  stroke: COURT_LINE_STROKE,
} as const

// Padding beween the corner of the card and the party logo
const LOGO_PADDING = 50

export const cardBack = {
  x: LOGO_PADDING,
  y: HEIGHT / 2 - WIDTH / 2 + LOGO_PADDING,
  size: WIDTH - 2 * LOGO_PADDING,
} as const
