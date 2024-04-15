export type CardPlacement =
  | {
      area: 'draw'
    }
  | {
      area: 'foundation'
      stack: number
    }
  | {
      area: 'stock'
    }
  | {
      area: 'tableau'
      stack: number
    }
