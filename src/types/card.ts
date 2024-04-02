export const ACE = 1
export const JACK = 11
export const QUEEN = 12
export const KING = 13

export type CardSuit = 'club' | 'diamond' | 'heart' | 'spade'
export type CardValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13

export type Card = {
  suit: CardSuit
  value: CardValue
  faceUp: boolean
  distress: {
    front: {
      x: number
      y: number
    }
    back: {
      x: number
      y: number
    }
  }
}

export type CardPlacement =
  | { stack: 'draw' }
  | { stack: 'foundation'; index: number }
  | { stack: 'stock' }
  | {
      stack: 'tableau'
      index: number
    }
