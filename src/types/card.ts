export const ACE = 1
export const JACK = 11
export const QUEEN = 12
export const KING = 13

export type CardFace = 'club' | 'diamond' | 'heart' | 'spade'
export type CardValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13

export type Card = {
  face: CardFace
  value: CardValue
  faceUp: boolean
}

export type CardPlacement =
  | {
      stack: 'tableau'
      index: number
    }
  | { stack: 'foundation'; index: number }
  | { stack: 'waste' }
  | { stack: 'stock' }
