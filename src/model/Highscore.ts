export type HighscoreRecord = {
  timestamp: number
  turns: number
}

export type HighscoreState = {
  addHighscore: (record: HighscoreRecord) => Promise<void>
  hasHighscore: () => Promise<boolean>
  getAllHighscores: () => Promise<HighscoreRecord[]>
}

const openDB = () => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open('highscoresDB', 1)

    request.onerror = () => {
      reject('Error opening database')
    }

    request.onsuccess = () => {
      const db = request.result
      resolve(db)
    }

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      db.createObjectStore('highscores', { keyPath: 'timestamp' }).createIndex(
        'turns',
        'turns',
        { unique: false },
      )
    }
  })
}

let db: IDBDatabase | null = null // Cache for the IndexedDB connection
const withDB = async <T>(
  callback: (db: IDBDatabase) => Promise<T>,
): Promise<T> => {
  if (!db) {
    db = await openDB()
  }
  return callback(db)
}

export const addHighscore = async (turns: number) =>
  new Promise<void>((resolve, reject) => {
    withDB(async (db) => {
      const transaction = db.transaction('highscores', 'readwrite')
      const objectStore = transaction.objectStore('highscores')
      const request = objectStore.add({
        timestamp: Date.now(),
        turns,
      })
      request.onsuccess = () => resolve()
      request.onerror = () => reject('Error adding records')
    })
  })

export const hasHighscore = () =>
  new Promise<boolean>((resolve, reject) => {
    withDB(async (db) => {
      const transaction = db.transaction('highscores', 'readonly')
      const objectStore = transaction.objectStore('highscores')
      const countRequest = objectStore.count()
      countRequest.onsuccess = () => resolve(countRequest.result > 0)
      countRequest.onerror = () => reject('Error checking records')
    })
  })

export const getAllHighscores = () =>
  new Promise<HighscoreRecord[]>((resolve, reject) => {
    return withDB(async (db) => {
      const transaction = db.transaction('highscores', 'readonly')
      const objectStore = transaction.objectStore('highscores')
      const index = objectStore.index('turns')
      const records: HighscoreRecord[] = []
      const cursorRequest = index.openCursor(null, 'next')
      cursorRequest.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result
        if (cursor) {
          records.push(cursor.value)
          cursor.continue()
        } else {
          resolve(records)
        }
      }
      cursorRequest.onerror = () => reject('Error retrieving records')
    })
  })
