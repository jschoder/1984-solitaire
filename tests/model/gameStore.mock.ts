import {
  JACK,
  KING,
  QUEEN,
  type Card,
  type CardSuit,
  type CardValue,
} from '../../src/types/card'
import type { Game } from '../../src/types/game'

const card = (suit: CardSuit, value: CardValue, faceUp = false): Card => ({
  suit,
  value,
  faceUp,
  distress: {
    front: {
      x: Math.random(),
      y: Math.random(),
    },
    back: {
      x: Math.random(),
      y: Math.random(),
    },
  },
})

export default () =>
  ({
    counter: 20,
    tableau: [
      [],
      [card('hearts', QUEEN), card('hearts', 1, true)],
      [],
      [
        card('diamonds', 3),
        card('diamonds', 6),
        card('clubs', 9),
        card('hearts', 7, true),
      ],
      [
        card('clubs', KING, true),
        card('diamonds', QUEEN, true),
        card('spade', JACK, true),
        card('diamonds', 10, true),
        card('spade', 9, true),
      ],
      [
        card('spade', 7),
        card('hearts', 9),
        card('diamonds', 7, true),
        card('clubs', 6, true),
        card('diamonds', 5, true),
      ],
      [
        card('hearts', 6),
        card('hearts', 5),
        card('hearts', 2),
        card('diamonds', 2),
        card('spade', QUEEN),
        card('clubs', JACK, true),
      ],
    ],
    foundation: [
      [],
      [card('diamonds', 1, true)],
      [],
      [
        card('clubs', 1, true),
        card('clubs', 2, true),
        card('clubs', 3, true),
        card('clubs', 4, true),
      ],
    ],
    stock: [
      card('hearts', 10),
      card('hearts', 8),
      card('diamonds', 4),
      card('spade', 3),
      card('clubs', 7),
      card('clubs', 8),
      card('hearts', JACK),
      card('spade', 6),
      card('spade', 10),
      card('diamonds', KING),
      card('clubs', QUEEN),
      card('diamonds', 8),
      card('spade', 2),
      card('diamonds', 9),
      card('hearts', KING),
      card('clubs', 10),
      card('spade', 8),
    ],
    draw: [
      card('spade', KING, true),
      card('spade', 1, true),
      card('spade', 5, true),
      card('clubs', 5, true),
      card('spade', 4, true),
      card('diamonds', JACK, true),
      card('hearts', 4, true),
      card('hearts', 3, true),
    ],
  }) as const satisfies Game
