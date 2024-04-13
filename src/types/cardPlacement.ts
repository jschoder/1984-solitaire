export type CardPlacement =
  | { stack: 'draw' }
  | { stack: 'foundation'; index: number }
  | { stack: 'stock' }
  | {
      stack: 'tableau'
      index: number
    }
