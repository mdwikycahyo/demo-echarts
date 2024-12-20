import { useState } from 'react'
import './style.css'

const NineBox = () => {
  const [gridData, setGridData] = useState({
    '0-2': ['Box 1'], // coordinate (0,1)
    '1-2': ['Box 2'], // coordinate (0,2)
    '2-2': ['Box 3'], // coordinate (0,3)
    '0-1': ['Box 4'], // coordinate (1,1)
    '1-1': ['Box 5'], // coordinate (1,2)
    '2-1': ['Box 6'], // coordinate (1,3)
    '0-0': ['Box 7'], // coordinate (2,1)
    '1-0': ['Box 8'], // coordinate (2,2)
    '2-0': ['Box 9'] // coordinate (2,3)
  })

  const handleDragStart = (e, boxId, fromCell) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ boxId, fromCell }))
  }

  const handleDrop = (e, targetCell) => {
    e.preventDefault()
    const { boxId, fromCell } = JSON.parse(e.dataTransfer.getData('text/plain'))

    setGridData((prevGrid) => {
      const updatedGrid = { ...prevGrid }

      // Remove the box from the original cell
      updatedGrid[fromCell] = updatedGrid[fromCell].filter((id) => id !== boxId)

      // Add the box to the target cell
      updatedGrid[targetCell] = [...(updatedGrid[targetCell] || []), boxId]

      return updatedGrid
    })
  }

  const renderGrid = () => {
    const grid = []
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        const cellKey = `${x}-${y}`
        grid.push(
          <div
            key={cellKey}
            className="grid-cell"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, cellKey)}
          >
            {gridData[cellKey]?.map((box) => (
              <div
                key={box}
                className="draggable-box"
                draggable
                onDragStart={(e) => handleDragStart(e, box, cellKey)}
              >
                {box}
              </div>
            ))}
          </div>
        )
      }
    }
    return grid
  }

  return <div className="grid-container">{renderGrid()}</div>
}

export default NineBox
