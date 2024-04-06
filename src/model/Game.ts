import type { Card, CardSuit, CardValue, CardPlacement } from '../types/card'
import { ACE } from '../types/card'
import { create } from 'zustand'
import { shuffle } from '../utils/array'

export type GameState = {
  tableau: Card[][]
  foundation: Card[][]
  stock: Card[]
  draw: Card[]
  canDrop: (card: Card, from: CardPlacement, to: CardPlacement) => boolean
  cycleStock: () => void
  moveCard: (card: Card, from: CardPlacement, to: CardPlacement) => void
  shufflePile: () => void
}

const useGameStore = create<GameState>((set, get) => ({
  tableau: [[], [], [], [], [], [], []],
  foundation: [[], [], [], []],
  stock: [],
  draw: [],
  canDrop: (card: Card, from: CardPlacement, to: CardPlacement) => {
    if (from === to) {
      return false
    }
    const state = get()
    if (to.stack === 'foundation') {
      if (state.foundation[to.index].length === 0) {
        return card.value === ACE
      } else {
        const topCard =
          state.foundation[to.index][state.foundation[to.index].length - 1]
        return topCard.suit === card.suit && topCard.value + 1 === card.value
      }
    } else if (to.stack === 'tableau') {
      if (card.value === ACE) {
        return false
      }
      if (state.tableau[to.index].length === 0) {
        return true
      }
      const topCard =
        state.tableau[to.index][state.tableau[to.index].length - 1]
      if (topCard.value - 1 === card.value) {
        if (card.suit === 'club' || card.suit === 'spade') {
          return topCard.suit === 'diamond' || topCard.suit === 'heart'
        } else if (card.suit === 'diamond' || card.suit === 'heart') {
          return topCard.suit === 'club' || topCard.suit === 'spade'
        } else {
          throw new Error('Unknown card suit: ' + card.suit)
        }
      } else {
        return false
      }
    } else {
      throw new Error('Unexpected stack: ' + to.stack)
    }
  },
  cycleStock: () => {
    set((state: GameState) => {
      let stock = state.stock
      let draw = state.draw
      if (stock.length === 0) {
        const firstCard = draw.shift()
        if (firstCard) {
          stock = draw.reverse().map((card) => ({ ...card, faceUp: false }))
          draw = [firstCard]
        }
      } else {
        const nextCard = stock.pop()
        if (nextCard) {
          nextCard.faceUp = true
          draw.push(nextCard)
        }
      }
      return {
        stock: [...stock],
        draw: [...draw],
      }
    })
  },
  moveCard: (card: Card, from: CardPlacement, to: CardPlacement) => {
    set((state: GameState) => {
      const { foundation, draw, stock, tableau } = state
      let movingCards: Card[] = []

      switch (from.stack) {
        case 'foundation':
          const lastFoundationCard = foundation[from.index].pop()
          if (lastFoundationCard) {
            movingCards = [lastFoundationCard]
          } else {
            throw new Error('Trying to slice of an empty foundation')
          }
          break
        case 'tableau':
          const cardList = tableau[from.index]
          const cardIndex = cardList.lastIndexOf(card)
          if (cardIndex === -1) {
            throw new Error('Card not found in tableau')
          }
          movingCards = cardList.splice(cardIndex)
          if (cardList.length > 0) {
            cardList[cardList.length - 1].faceUp = true
          }
          break
        case 'draw':
          const lastdrawCard = draw.pop()
          if (lastdrawCard) {
            movingCards = [lastdrawCard]
          } else {
            throw new Error('Trying to slice of an empty draw')
          }
          break
        default:
          throw new Error('Invalid drag source: ' + to.stack)
      }
      switch (to.stack) {
        case 'foundation':
          foundation[to.index].push(...movingCards)
          break
        case 'tableau':
          tableau[to.index].push(...movingCards)
          break
        default:
          throw new Error('Invalid drop target: ' + to.stack)
      }
      return {
        foundation: [...foundation],
        tableau: [...tableau],
        draw: [...draw],
        stock: [...stock],
      }
    })
  },
  shufflePile: () => {
    set(() => {
      const suits: CardSuit[] = ['diamond', 'heart', 'spade', 'club']
      const values: CardValue[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
      const cards: Card[] = shuffle(
        suits.flatMap((suit) =>
          values.map((value) => ({
            suit,
            value,
            faceUp: false,
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
          })),
        ),
      )
      const tableau = []
      for (let i = 0; i < 7; i++) {
        const subarray = cards.splice(0, i + 1)
        subarray[subarray.length - 1].faceUp = true
        tableau.push(subarray)
      }
      const firstDrawnCard = cards.pop()
      const draw = firstDrawnCard ? [{ ...firstDrawnCard, faceUp: true }] : []
      const stock = cards
      return {
        tableau,
        draw,
        stock,
      }
    })
  },
}))

export default useGameStore
