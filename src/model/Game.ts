// import { atom, selector } from 'jotai'
import type { Card, CardSuit, CardValue, CardPlacement } from '../types/card'
import { ACE, JACK, KING, QUEEN } from '../types/card'
import { create } from 'zustand'
import { shuffle } from '../utils/array'

type GameType = {
  tableau: {
    hidden: Card[]
    visible: Card[]
  }[]
  foundation: Card[][]
  stock: Card[]
  waste: Card[]
}

export type GameState = {
  tableau: Card[][]
  foundation: Card[][]
  stock: Card[]
  waste: Card[]
  cycleStock: () => void
  shufflePile: () => void
  moveCard: (card: Card, from: CardPlacement, to: CardPlacement) => void
  // moveCard: (source: string, destination: string) => void
}

const useGameStore = create<GameState>((set) => ({
  // Tableau piles (7 piles)
  tableau: [[], [], [], [], [], [], []],
  // Foundation piles (4 piles)
  foundation: [[], [], [], []],
  // Stock pile
  stock: [],
  // Waste pile
  waste: [],
  cycleStock: () => {
    set((state: GameState) => {
      let stock = state.stock
      let waste = state.waste
      if (stock.length === 0) {
        const firstCard = waste.shift()
        if (firstCard) {
          stock = waste.reverse().map((card) => ({ ...card, faceUp: false }))
          waste = [firstCard]
        }
      } else {
        const nextCard = stock.pop()
        if (nextCard) {
          nextCard.faceUp = true
          waste.push(nextCard)
        }
      }

      console.log('C', waste, stock)

      return {
        stock: [...stock],
        waste: [...waste],
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
      const waste = firstDrawnCard ? [{ ...firstDrawnCard, faceUp: true }] : []
      const stock = cards
      return {
        tableau,
        waste,
        stock,
      }
    })
  },
  moveCard: (card: Card, from: CardPlacement, to: CardPlacement) => {
    set((state: GameState) => {
      // TODO fix targets
      const { foundation, waste, stock, tableau } = state
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
        case 'waste':
          const lastWasteCard = waste.pop()
          if (lastWasteCard) {
            movingCards = [lastWasteCard]
          } else {
            throw new Error('Trying to slice of an empty waste')
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
      }
      switch (to.stack) {
        case 'foundation':
          foundation[to.index].push(...movingCards)
          break
        case 'waste':
          console.log('NOPE')
          break
        case 'tableau':
          tableau[to.index].push(...movingCards)
          break
      }
      return {
        foundation: [...foundation],
        tableau: [...tableau],
        waste: [...waste],
        stock: [...stock],
      }
    })
  },
}))

export default useGameStore
