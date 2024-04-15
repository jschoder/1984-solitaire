import { create } from 'zustand'
import type { Card, CardSuit, CardValue } from '../types/card'
import { ACE } from '../types/card'
import type { CardPlacement } from '../types/cardPlacement'
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
    if (to.area === 'foundation') {
      if (state.foundation[to.stack].length === 0) {
        return card.value === ACE
      } else {
        const topCard =
          state.foundation[to.stack][state.foundation[to.stack].length - 1]
        return topCard.suit === card.suit && topCard.value + 1 === card.value
      }
    } else if (to.area === 'tableau') {
      if (card.value === ACE) {
        return false
      }
      if (state.tableau[to.stack].length === 0) {
        return true
      }
      const topCard =
        state.tableau[to.stack][state.tableau[to.stack].length - 1]
      if (topCard.value - 1 === card.value) {
        if (card.suit === 'clubs' || card.suit === 'spade') {
          return topCard.suit === 'diamonds' || topCard.suit === 'hearts'
        } else if (card.suit === 'diamonds' || card.suit === 'hearts') {
          return topCard.suit === 'clubs' || topCard.suit === 'spade'
        } else {
          throw new Error('Unknown card suit: ' + card.suit)
        }
      } else {
        return false
      }
    } else {
      throw new Error('Unexpected stack: ' + to.area)
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

      switch (from.area) {
        case 'foundation':
          const lastFoundationCard = foundation[from.stack].pop()
          if (lastFoundationCard) {
            movingCards = [lastFoundationCard]
          } else {
            throw new Error('Trying to slice of an empty foundation')
          }
          break
        case 'tableau':
          const cardList = tableau[from.stack]
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
          throw new Error('Invalid drag source: ' + to.area)
      }
      switch (to.area) {
        case 'foundation':
          foundation[to.stack].push(...movingCards)
          break
        case 'tableau':
          tableau[to.stack].push(...movingCards)
          break
        default:
          throw new Error('Invalid drop target: ' + to.area)
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
      const suits: CardSuit[] = ['diamonds', 'hearts', 'spade', 'clubs']
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
