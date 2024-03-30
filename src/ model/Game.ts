// import { atom, selector } from 'jotai'
import type { Card, CardFace, CardValue } from '../types/card'
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
  tableau: {
    hidden: Card[]
    visible: Card[]
  }[]
  foundation: Card[][]
  stock: Card[]
  waste: Card[]
  cycleStock: () => void
  shufflePile: () => void
  // moveCard: (source: string, destination: string) => void
}

const useGameStore = create<GameState>((set) => ({
  // Tableau piles (7 piles)
  tableau: [
    { hidden: [], visible: [] },
    { hidden: [], visible: [] },
    { hidden: [], visible: [] },
    { hidden: [], visible: [] },
    { hidden: [], visible: [] },
    { hidden: [], visible: [] },
    { hidden: [], visible: [] },
  ],
  // Foundation piles (4 piles)
  foundation: [[], [], [], []],
  // Stock pile
  stock: [],
  // Waste pile
  waste: [],
  cycleStock: () => {
    set((state: GameState) => {
      console.log('CYCLE')
      let stock = state.stock
      let waste = state.waste

      if (stock.length === 0) {
        console.log('CYCLE 1')
        const firstCard = waste.shift()
        if (firstCard) {
          console.log('CYCLE 2')
          stock = waste.reverse()
          waste = [firstCard]
        }
      } else {
        console.log('CYCLE 3')
        const nextCard = stock.pop()
        if (nextCard) {
          console.log('CYCLE 4')
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
    set((state: GameState) => {
      const faces: CardFace[] = ['diamond', 'heart', 'spade', 'club']
      const values: CardValue[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
      const cards: Card[] = shuffle(
        faces.flatMap((face) => values.map((value) => ({ face, value }))),
      )
      const tableau = []
      for (let i = 0; i < 7; i++) {
        const subarray = cards.splice(0, i + 1)
        const firstCard = subarray.pop()
        tableau.push({
          hidden: subarray,
          visible: firstCard ? [firstCard] : [],
        })
      }
      const firstDrawnCard = cards.pop()
      const waste = firstDrawnCard ? [firstDrawnCard] : []
      const stock = cards
      return {
        tableau,
        waste,
        stock,
      }
    })
  },
  /*
  drawCard: () => {
    // Implement drawCard functionality
    // Example logic: move a card from stock to waste
    set((state) => ({
      game: {
        ...state.game,
        stock: state.game.stock.slice(1), // Remove the top card from stock
        waste: [state.game.stock[0], ...state.game.waste], // Move the top card to waste
      },
    }))
  },
  moveCard: (source: string, destination: string) => {
    // Implement moveCard functionality
    // Example logic: move a card from source pile to destination pile
    set((state) => {
      // Implement the moveCard logic based on the source and destination
      // Update the game object accordingly
      return {
        game: updatedGame, // Update the game object with the new state
      }
    })
  },
  */
}))

export default useGameStore

/*
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}))
export default useStore

/*
type GameType = {
  tableau: {
    hidden: Card[]
    visible: Card[]
  }[]
  foundation: Card[][]
  stock: Card[]
  waste: Card[]
}

const GameAtom = atom<GameType>({

})

// export shuffleGame =

/*
// Define an atom to store the initial complex structure
export const complexStructureAtom = atom({
  data: {
    // Your complex structure here
  },
  buckets: {
    bucket1: [],
    bucket2: [],
    // Add more buckets as needed
  },
});

import { selector } from 'jotai';

export const moveSubobjectToBucket = selector(
  (get) => get(complexStructureAtom),
  (get, set, { subobject, bucket }) => {
    const { data, buckets } = get(complexStructureAtom);

    // Check if the subobject is unique before moving it to a bucket
    const isSubobjectUnique = !buckets[bucket].some((item) => item.id === subobject.id);

    if (isSubobjectUnique) {
      set(complexStructureAtom, {
        ...data,
        buckets: {
          ...buckets,
          [bucket]: [...buckets[bucket], subobject],
        },
      });
    }
  }
);

import { useAtom } from 'jotai';
import { complexStructureAtom, moveSubobjectToBucket } from './atoms';

const YourComponent = () => {
  const [complexStructure, setComplexStructure] = useAtom(complexStructureAtom);
  const moveSubobject = useAtom(moveSubobjectToBucket);

  // Call moveSubobject with the subobject and bucket name to move it to the specified bucket
  moveSubobject({ subobject: yourSubobject, bucket: 'bucket1' });

  return (
    // Your component JSX
  );
};
*/
