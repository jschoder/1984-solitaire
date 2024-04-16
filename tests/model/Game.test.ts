import { expect } from '@jest/globals'
import { act, renderHook } from '@testing-library/react'
import _ from 'lodash'
import useGameStore from '../../src/model/Game'
import createMockData from './gameStore.mock'
import './toBeValidGameData'

describe('Game', () => {
  beforeEach(() => {
    // Provide custom setup for Zustand store
    useGameStore.setState(createMockData())
  })

  it('validate mock data', () => {
    const mockData = createMockData()
    expect(mockData).toBeValidGameData()
  })

  it('should create a store', () => {
    const { result } = renderHook(() => useGameStore())
    expect(typeof result.current.counter).toBe('number')
    expect(result.current.tableau).toHaveLength(7)
    expect(result.current.tableau[0]).toHaveLength(0)
    expect(result.current.tableau[3]).toHaveLength(4)
    expect(result.current.tableau[6]).toHaveLength(6)
    expect(result.current.foundation).toHaveLength(4)
    expect(result.current.stock).toHaveLength(17)
    expect(result.current.draw).toHaveLength(8)
    expect(typeof result.current.canDrop).toBe('function')
    expect(typeof result.current.drawCard).toBe('function')
    expect(typeof result.current.moveCard).toBe('function')
    expect(typeof result.current.shufflePile).toBe('function')
  })

  it('should shuffle the stock', () => {
    const { result } = renderHook(() => useGameStore())
    const initialGameState = _.cloneDeep(result.current)

    act(() => result.current.shufflePile())
    expect(result.current.stock).not.toEqual(initialGameState.stock)
    expect(result.current.counter).toBe(0)
    expect(result.current.tableau[0]).toHaveLength(1)
    expect(result.current.tableau[3]).toHaveLength(4)
    expect(result.current.tableau[6]).toHaveLength(7)
    expect(result.current.foundation[0]).toHaveLength(0)
    expect(result.current.foundation[3]).toHaveLength(0)
    expect(result.current.draw).toHaveLength(1)
    expect(result.current.stock).toHaveLength(23)
  })

  it('should draw single cards', () => {
    const { result } = renderHook(() => useGameStore())
    const originalCounter = result.current.counter
    const originalStockSize = result.current.stock.length
    const originalDrawSize = result.current.draw.length

    act(() => result.current.drawCard())
    expect(result.current.counter).toBe(originalCounter + 1)
    expect(result.current.stock).toHaveLength(originalStockSize - 1)
    expect(result.current.draw).toHaveLength(originalDrawSize + 1)

    act(() => result.current.drawCard())
    expect(result.current.counter).toBe(originalCounter + 2)
    expect(result.current.stock).toHaveLength(originalStockSize - 2)
    expect(result.current.draw).toHaveLength(originalDrawSize + 2)
    expect(result.current).toBeValidGameData()
  })

  it('should cycle through entire stock pile', () => {
    const { result } = renderHook(() => useGameStore())
    const originalStockSize = result.current.stock.length
    const originalDrawSize = result.current.draw.length

    for (let i = 0; i < 100 && result.current.stock.length > 0; i++) {
      act(() => result.current.drawCard())
    }
    expect(result.current.draw).toHaveLength(
      originalDrawSize + originalStockSize,
    )
    expect(result.current.stock).toHaveLength(0)

    act(() => result.current.drawCard())
    expect(result.current.draw).toHaveLength(1)
    expect(result.current.stock).toHaveLength(
      originalDrawSize + originalStockSize - 1,
    )
    expect(result.current).toBeValidGameData()
  })

  /*
  TODO mock data
  it('should move a card to foundation', () => {
    const { result } = renderHook(() => useGameStore())
    const card: Card = {
      suit: 'diamond',
      value: ACE,
      faceUp: true,
      distress: {
        front: {
          x: 0,
          y: 0,
        },
        back: {
          x: 0,
          y: 0,
        },
      },
    }
    const tableauPlacement: CardPlacement = {
      stack: 'tableau',
      index: 0,
    }
    const foundationPlacement: CardPlacement = { stack: 'foundation', index: 0 }
    act(() =>
      result.current.moveCard(card, tableauPlacement, foundationPlacement),
    )
    expect(result.current.tableau[0]).toHaveLength(0)
    expect(result.current.foundation[0]).toEqual([card])
  })
  */

  /*
  TODO mock data
  it('should move a card to tableau', () => {
    const { result } = renderHook(() => useGameStore())
    const card: Card = {
      suit: 'diamond',
      value: ACE,
      faceUp: true,
      distress: {
        front: {
          x: 0,
          y: 0,
        },
        back: {
          x: 0,
          y: 0,
        },
      },
    }
    const foundationPlacement: CardPlacement = { stack: 'foundation', index: 0 }
    const tableauPlacement: CardPlacement = {
      stack: 'tableau',
      index: 0,
    }
    act(() =>
      result.current.moveCard(card, foundationPlacement, tableauPlacement),
    )
    expect(result.current.tableau[0]).toEqual([card])
    expect(result.current.foundation[0]).toHaveLength(0)
  })
  */
})
