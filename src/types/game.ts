import { Card } from './card'

export type Game = {
  tableau: Card[][]
  foundation: Card[][]
  stock: Card[]
  draw: Card[]
}
