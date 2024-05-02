import { expect } from '@jest/globals'
import { act, renderHook } from '@testing-library/react'
import _ from 'lodash'
import useGameStore from '../../src/model/Game'
import { ACE } from '../../src/types/card'
import createMockData, { mockCard } from './gameStore.mock'
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

  it('should validate drop conditions', () => {
    const { result } = renderHook(() => useGameStore())
    // From and to being the same area&stack
    expect(
      result.current.canDrop(
        [mockCard('spade', 1)],
        { area: 'tableau', stack: 0 },
        { area: 'tableau', stack: 0 },
      ),
    ).toBe(false)

    // No cards
    expect(() =>
      result.current.canDrop(
        [],
        { area: 'stock' },
        { area: 'tableau', stack: 0 },
      ),
    ).toThrow()

    // Multiple cards to foundation
    expect(
      result.current.canDrop(
        [mockCard('spade', 1), mockCard('spade', 2)],
        { area: 'tableau', stack: 0 },
        { area: 'foundation', stack: 1 },
      ),
    ).toBe(false)

    // To empty foundation
    expect(
      result.current.canDrop(
        [mockCard('spade', 1)],
        { area: 'tableau', stack: 0 },
        { area: 'foundation', stack: 0 },
      ),
    ).toBe(true)
    expect(
      result.current.canDrop(
        [mockCard('spade', 2)],
        { area: 'tableau', stack: 0 },
        { area: 'foundation', stack: 0 },
      ),
    ).toBe(false)

    // To not empty foundation
    expect(
      result.current.canDrop(
        [mockCard('hearts', 5)],
        { area: 'tableau', stack: 0 },
        { area: 'foundation', stack: 3 },
      ),
    ).toBe(false)
    expect(
      result.current.canDrop(
        [mockCard('clubs', 6)],
        { area: 'tableau', stack: 0 },
        { area: 'foundation', stack: 3 },
      ),
    ).toBe(false)
    expect(
      result.current.canDrop(
        [mockCard('clubs', 5)],
        { area: 'tableau', stack: 0 },
        { area: 'foundation', stack: 3 },
      ),
    ).toBe(true)

    // Ace to tableau
    expect(
      result.current.canDrop(
        [mockCard('hearts', ACE)],
        { area: 'tableau', stack: 0 },
        { area: 'tableau', stack: 1 },
      ),
    ).toBe(false)

    // To empty tableau
    expect(
      result.current.canDrop(
        [mockCard('hearts', 12)],
        { area: 'draw' },
        { area: 'tableau', stack: 2 },
      ),
    ).toBe(false)
    expect(
      result.current.canDrop(
        [mockCard('spade', 3), mockCard('hearts', 2)],
        { area: 'tableau', stack: 6 },
        { area: 'tableau', stack: 2 },
      ),
    ).toBe(false)
    expect(
      result.current.canDrop(
        [mockCard('hearts', 13)],
        { area: 'draw' },
        { area: 'tableau', stack: 2 },
      ),
    ).toBe(true)

    // To tableau
    expect(
      result.current.canDrop(
        [mockCard('spade', 6)],
        { area: 'tableau', stack: 4 },
        { area: 'tableau', stack: 3 },
      ),
    ).toBe(true)
    expect(
      result.current.canDrop(
        [mockCard('diamonds', 8), mockCard('clubs', 7)],
        { area: 'tableau', stack: 5 },
        { area: 'tableau', stack: 4 },
      ),
    ).toBe(true)
    expect(
      result.current.canDrop(
        [mockCard('clubs', 3)],
        { area: 'tableau', stack: 6 },
        { area: 'tableau', stack: 4 },
      ),
    ).toBe(false)
    expect(
      result.current.canDrop(
        [mockCard('diamonds', 6), mockCard('spade', 5)],
        { area: 'tableau', stack: 6 },
        { area: 'tableau', stack: 4 },
      ),
    ).toBe(false)

    // To stock or draw stacks
    expect(() =>
      result.current.canDrop(
        [mockCard('hearts', 13)],
        { area: 'tableau', stack: 0 },
        { area: 'stock' },
      ),
    ).toThrow()
    expect(() =>
      result.current.canDrop(
        [mockCard('hearts', 13)],
        { area: 'tableau', stack: 0 },
        { area: 'draw' },
      ),
    ).toThrow()
  })
})
