export const shuffle = <T>(array: T[]): T[] => {
  const newArray = [...array] // Create a new array to avoid mutating the original array
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)) // Generate a random index
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]] // Swap elements at index i and j
  }
  return newArray
}
