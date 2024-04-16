import { expect } from '@jest/globals'
import type { MatcherFunction } from 'expect'
import _ from 'lodash'
import { CardSuit, CardValue } from '../../src/types/card'
import { Game } from '../../src/types/game'

const toBeValidGameData: MatcherFunction<[]> = function (actual: unknown) {
  if (!actual) {
    throw new TypeError('Missing Game data!')
  }
  if (
    typeof actual !== 'object' ||
    !('tableau' in actual) ||
    !Array.isArray(actual['tableau']) ||
    !('foundation' in actual) ||
    !Array.isArray(actual['foundation']) ||
    !('stock' in actual) ||
    !Array.isArray(actual['stock']) ||
    !('draw' in actual) ||
    !Array.isArray(actual['draw'])
  ) {
    throw new TypeError('These must be of type Game!')
  }

  const game = actual as Game

  const allCards = Object.values(game).flat().flat()
  const uniqueCards = _.uniqBy(allCards, (card) => `${card.suit}-${card.value}`)
  const suits = ['clubs', 'diamonds', 'hearts', 'spade'] as const
  for (const suit of suits) {
    if (uniqueCards.filter((card) => card.suit === suit).length !== 13) {
      return {
        message: () => `There must be exactly 13 distinct ${suit} cards`,
        pass: false,
      }
    }
  }

  for (const [index, column] of game.foundation.entries()) {
    if (column.length === 0) {
      continue
    }
    const expectedSuit = column[0].suit
    for (const [innerIndex, card] of column.entries()) {
      if (card.suit !== expectedSuit) {
        return {
          message: () =>
            `Column ${index} card ${innerIndex} has suit ${card.suit} but expected ${expectedSuit}`,
          pass: false,
        }
      }
      if (card.value !== innerIndex + 1) {
        return {
          message: () =>
            `Column ${index} card ${innerIndex} has value ${card.value} but expected ${innerIndex + 1}`,
          pass: false,
        }
      }
    }
  }

  for (const [tableauIndex, tableauColumn] of game.tableau.entries()) {
    if (tableauColumn.length === 0) {
      continue
    }
    let faceUpTrueIndex = -1
    for (const [innerIndex, card] of tableauColumn.entries()) {
      if (card.faceUp) {
        faceUpTrueIndex = innerIndex
        break
      }
    }
    if (faceUpTrueIndex === -1) {
      return {
        message: () =>
          `Tableau ${tableauIndex} has to have at least one faceUp = true card`,
        pass: false,
      }
    }
    let previousValue: CardValue | undefined = undefined
    let prevSuit: CardSuit | undefined = undefined
    for (const [innerIndex, card] of tableauColumn
      .slice(faceUpTrueIndex)
      .entries()) {
      if (!card.faceUp) {
        return {
          message: () =>
            `Tableau ${tableauIndex} card ${innerIndex + faceUpTrueIndex} has is faceUp = false when it should be true`,
          pass: false,
        }
      }
      if (prevSuit === undefined) {
        prevSuit = card.suit
      } else if (
        !(
          ((prevSuit === 'diamonds' || prevSuit === 'hearts') &&
            (card.suit === 'clubs' || card.suit === 'spade')) ||
          ((prevSuit === 'clubs' || prevSuit === 'spade') &&
            (card.suit === 'diamonds' || card.suit === 'hearts'))
        )
      ) {
        return {
          message: () =>
            `Tableau ${tableauIndex} card ${innerIndex + faceUpTrueIndex} has suit ${card.suit} but expected ${
              prevSuit === 'diamonds' || prevSuit === 'hearts'
                ? 'clubs or spade'
                : 'diamonds or hearts'
            }`,
          pass: false,
        }
      } else {
        prevSuit = card.suit
      }
      if (previousValue === undefined) {
        previousValue = card.value
      } else if (card.value !== previousValue - 1) {
        return {
          message: () =>
            `Tableau ${tableauIndex} card ${innerIndex + faceUpTrueIndex} has value ${card.value} but expected ${previousValue! - 1}`,
          pass: false,
        }
      } else {
        previousValue--
      }
    }
  }

  if (game.draw.some((card) => !card.faceUp)) {
    return {
      message: () => 'All cards in game.draw must have faceUp = true',
      pass: false,
    }
  }
  if (game.stock.some((card) => card.faceUp)) {
    return {
      message: () => 'All cards in game.stock must have faceUp = false',
      pass: false,
    }
  }

  return {
    message: () => 'Game has a valid structure',
    pass: true,
  }
}

expect.extend({
  toBeValidGameData,
})

declare module 'expect' {
  interface AsymmetricMatchers {
    toBeValidGameData(): void
  }
  interface Matchers<R> {
    toBeValidGameData(): R
  }
}
