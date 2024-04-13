export const ACE = 1
export const JACK = 11
export const QUEEN = 12
export const KING = 13

export type CardSuit = 'clubs' | 'diamonds' | 'hearts' | 'spade'
export type CardValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13

export type Card = {
  distress: {
    back: {
      x: number
      y: number
    }
    front: {
      x: number
      y: number
    }
  }
  faceUp: boolean
  suit: CardSuit
  value: CardValue
}
