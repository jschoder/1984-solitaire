import Board from './containers/Board'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  return (
    <div className=" bg-board-color">
      <DndProvider backend={HTML5Backend}>
        <Board />
      </DndProvider>
    </div>
  )
}

export default App
