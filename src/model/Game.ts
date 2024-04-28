import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { ACE, CardSuit, CardValue, type Card } from '~/types/card'
import type { CardPlacement } from '~/types/cardPlacement'
import type { Game } from '~/types/game'
import { shuffle } from '~/utils/array'

export type GameState = Game & {
  canDrop: (cards: Card[], from: CardPlacement, to: CardPlacement) => boolean
  drawCard: () => void
  getPartialStack: (card: Card, placement: CardPlacement) => Card[]
  isWon: () => boolean
  moveCard: (cards: Card[], from: CardPlacement, to: CardPlacement) => void
  shufflePile: () => void
}

const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      counter: 0,
      tableau: [[], [], [], [], [], [], []],
      foundation: [[], [], [], []],
      stock: [],
      draw: [],
      canDrop: (cards: Card[], from: CardPlacement, to: CardPlacement) => {
        if (JSON.stringify(from) === JSON.stringify(to)) {
          return false
        }
        if (cards.length === 0) {
          throw new Error("Can't drop nothing")
        }
        const state = get()
        if (to.area === 'foundation') {
          if (cards.length > 1) {
            return false
          }
          if (state.foundation[to.stack].length === 0) {
            return cards[0].value === ACE
          } else {
            const topCard =
              state.foundation[to.stack][state.foundation[to.stack].length - 1]
            return (
              topCard.suit === cards[0].suit &&
              topCard.value + 1 === cards[0].value
            )
          }
        } else if (to.area === 'tableau') {
          if (cards[0].value === ACE) {
            return false
          }
          if (state.tableau[to.stack].length === 0) {
            return true
          }
          const topCard =
            state.tableau[to.stack][state.tableau[to.stack].length - 1]
          if (topCard.value - 1 === cards[0].value) {
            const topCardSuit = topCard.suit
            const cardsSuit = cards[0].suit
            if (cardsSuit === 'clubs' || cardsSuit === 'spade') {
              return topCardSuit === 'diamonds' || topCardSuit === 'hearts'
            } else {
              return topCardSuit === 'clubs' || topCardSuit === 'spade'
            }
          } else {
            return false
          }
        } else {
          throw new Error('Unexpected stack: ' + to.area)
        }
      },
      drawCard: () => {
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
            counter: state.counter + 1,
            stock: [...stock],
            draw: [...draw],
          }
        })
      },
      getPartialStack: (card: Card, placement: CardPlacement) => {
        const state = get()
        const cardList: Card[] =
          'stack' in placement
            ? state[placement.area][placement.stack]
            : state[placement.area]
        const cardIndex = cardList.lastIndexOf(card)
        if (cardIndex === -1) {
          throw new Error('Card not found in ' + placement.area)
        }
        return cardList.slice(cardIndex)
      },
      isWon: () => !get().foundation.some((stack) => stack.length < 13),
      moveCard: (cards: Card[], from: CardPlacement, to: CardPlacement) => {
        set((state: GameState) => {
          const fromCardList: Card[] =
            'stack' in from ? state[from.area][from.stack] : state[from.area]
          fromCardList.splice(fromCardList.length - cards.length)
          if (fromCardList.length > 0) {
            fromCardList[fromCardList.length - 1].faceUp = true
          }
          switch (to.area) {
            case 'foundation':
              state.foundation[to.stack].push(...cards)
              break
            case 'tableau':
              state.tableau[to.stack].push(...cards)
              break
            default:
              throw new Error('Invalid drop target: ' + to.area)
          }
          return {
            counter: state.counter + 1,
            foundation: [...state.foundation],
            tableau: [...state.tableau],
            draw: [...state.draw],
            stock: [...state.stock],
          }
        })
      },
      shufflePile: () => {
        set(() => {
          const suits: CardSuit[] = ['diamonds', 'hearts', 'spade', 'clubs']
          const values: CardValue[] = [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
          ]
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
          const draw = firstDrawnCard
            ? [{ ...firstDrawnCard, faceUp: true }]
            : []
          const stock = cards
          return {
            counter: 0,
            foundation: [[], [], [], []],
            tableau,
            draw,
            stock,
          }
        })
      },
    }),
    {
      name: 'game-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export default useGameStore
