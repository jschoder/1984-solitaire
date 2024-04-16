import { Card } from './card'

export type Game = {
  counter: number
  tableau: Card[][]
  foundation: Card[][]
  stock: Card[]
  draw: Card[]
}
