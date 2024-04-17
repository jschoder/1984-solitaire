import {
  JACK,
  KING,
  QUEEN,
  type Card,
  type CardSuit,
  type CardValue,
} from '../../src/types/card'
import type { Game } from '../../src/types/game'

export const mockCard = (
  suit: CardSuit,
  value: CardValue,
  faceUp = false,
): Card => ({
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
      [mockCard('hearts', QUEEN), mockCard('hearts', 1, true)],
      [],
      [
        mockCard('diamonds', 3),
        mockCard('diamonds', 6),
        mockCard('clubs', 9),
        mockCard('hearts', 7, true),
      ],
      [
        mockCard('clubs', KING, true),
        mockCard('diamonds', QUEEN, true),
        mockCard('spade', JACK, true),
        mockCard('diamonds', 10, true),
        mockCard('spade', 9, true),
      ],
      [
        mockCard('spade', 7),
        mockCard('hearts', 9),
        mockCard('diamonds', 7, true),
        mockCard('clubs', 6, true),
        mockCard('diamonds', 5, true),
      ],
      [
        mockCard('hearts', 6),
        mockCard('hearts', 5),
        mockCard('hearts', 2),
        mockCard('diamonds', 2),
        mockCard('spade', QUEEN),
        mockCard('clubs', JACK, true),
      ],
    ],
    foundation: [
      [],
      [mockCard('diamonds', 1, true)],
      [],
      [
        mockCard('clubs', 1, true),
        mockCard('clubs', 2, true),
        mockCard('clubs', 3, true),
        mockCard('clubs', 4, true),
      ],
    ],
    stock: [
      mockCard('hearts', 10),
      mockCard('hearts', 8),
      mockCard('diamonds', 4),
      mockCard('spade', 3),
      mockCard('clubs', 7),
      mockCard('clubs', 8),
      mockCard('hearts', JACK),
      mockCard('spade', 6),
      mockCard('spade', 10),
      mockCard('diamonds', KING),
      mockCard('clubs', QUEEN),
      mockCard('diamonds', 8),
      mockCard('spade', 2),
      mockCard('diamonds', 9),
      mockCard('hearts', KING),
      mockCard('clubs', 10),
      mockCard('spade', 8),
    ],
    draw: [
      mockCard('spade', KING, true),
      mockCard('spade', 1, true),
      mockCard('spade', 5, true),
      mockCard('clubs', 5, true),
      mockCard('spade', 4, true),
      mockCard('diamonds', JACK, true),
      mockCard('hearts', 4, true),
      mockCard('hearts', 3, true),
    ],
  }) as const satisfies Game
