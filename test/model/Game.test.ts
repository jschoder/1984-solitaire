import { act, renderHook } from '@testing-library/react'

import useGameStore from '../../src/model/Game'

describe('Game', () => {
  it('should create a store', () => {
    const { result } = renderHook(() => useGameStore())
    expect(result.current.tableau).toHaveLength(7)
    expect(result.current.tableau[0]).toHaveLength(0)
    expect(result.current.tableau[3]).toHaveLength(0)
    expect(result.current.tableau[6]).toHaveLength(0)
    expect(result.current.foundation).toHaveLength(4)
    expect(result.current.stock).toBeDefined()
    expect(result.current.draw).toBeDefined()
    expect(result.current.canDrop).toBeDefined()
    expect(result.current.cycleStock).toBeDefined()
    expect(result.current.moveCard).toBeDefined()
    expect(result.current.shufflePile).toBeDefined()
  })

  it('should shuffle the stock', () => {
    const { result } = renderHook(() => useGameStore())
    const initialStock = result.current.stock
    act(() => result.current.shufflePile())
    expect(result.current.stock).not.toEqual(initialStock)
    expect(result.current.tableau[0]).toHaveLength(1)
    expect(result.current.tableau[3]).toHaveLength(4)
    expect(result.current.tableau[6]).toHaveLength(7)
  })

  it('should cycle the stock', () => {
    const { result } = renderHook(() => useGameStore())
    act(() => result.current.cycleStock())
    expect(result.current.stock).toHaveLength(22)
    expect(result.current.draw).toHaveLength(2)
    expect(result.current.draw[0]).toEqual({
      suit: expect.stringMatching(/^(clubs|diamonds|hearts|spade)$/),
      value: expect.any(Number),
      /*
          .toBeInteger()
          .toBeGreaterThanOrEqual(1)
          .toBeLessThanOrEqual(13),
          */
      faceUp: true,
      distress: {
        front: {
          x: expect.any(Number),
          y: expect.any(Number),
          /*
              .toBeGreaterThanOrEqual(0)
              .toBeLessThanOrEqual(1),
              */
        },
        back: {
          x: expect.any(Number),
          y: expect.any(Number),
        },
      },
    })
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
