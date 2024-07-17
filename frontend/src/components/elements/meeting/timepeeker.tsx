    "use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Component() {
  const [selectedSlots, setSelectedSlots] = useState([])
  const [isSelecting, setIsSelecting] = useState(false)
  const [startRow, setStartRow] = useState(null)
  const [startCol, setStartCol] = useState(null)
  const times = [
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
  ]
  const days = ["Mon", "Tue", "Wed"]
  const slots = [
    ["", "", ""],
    ["bg-green-500", "", ""],
    ["bg-green-500", "bg-green-500", ""],
    ["", "bg-green-500", "bg-green-500"],
    ["bg-green-500", "bg-green-500", ""],
    ["", "bg-green-500", "bg-green-500"],
    ["bg-green-700", "bg-green-700", "bg-green-700"],
    ["bg-green-500", "bg-green-500", "bg-green-500"],
    ["", "bg-green-500", "bg-green-500"],
    ["bg-green-300", "", "bg-green-300"],
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]
  const handleSlotClick = (rowIndex, colIndex) => {
    if (!isSelecting) {
      setIsSelecting(true)
      setStartRow(rowIndex)
      setStartCol(colIndex)
    } else {
      const endRow = rowIndex
      const endCol = colIndex
      const newSelectedSlots = []
      for (let row = Math.min(startRow, endRow); row <= Math.max(startRow, endRow); row++) {
        for (let col = Math.min(startCol, endCol); col <= Math.max(startCol, endCol); col++) {
          const slot = `${times[row]} - ${days[col]}`
          newSelectedSlots.push(slot)
        }
      }
      setSelectedSlots(newSelectedSlots)
      setIsSelecting(false)
    }
  }
  const handleSubmit = () => {
    console.log("Selected slots:", selectedSlots)
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2" />
            {days.map((day) => (
              <th key={day} className="px-4 py-2 text-center">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map((time, index) => (
            <tr key={time}>
              <td className="px-4 py-2 text-right">{time}</td>
              {slots[index].map((slot, i) => (
                <td
                  key={i}
                  className={`px-4 py-2 ${slot} border border-gray-300 cursor-pointer ${
                    selectedSlots.includes(`${times[index]} - ${days[i]}`) ? "bg-blue-500 text-white" : ""
                  } ${
                    isSelecting &&
                    startRow !== null &&
                    startCol !== null &&
                    index >= Math.min(startRow, endRow) &&
                    index <= Math.max(startRow, endRow) &&
                    i >= Math.min(startCol, endCol) &&
                    i <= Math.max(startCol, endCol)
                      ? "bg-blue-200"
                      : ""
                  }`}
                  onMouseDown={() => handleSlotClick(index, i)}
                  onMouseEnter={(e) => {
                    if (isSelecting && e.buttons === 1) {
                      handleSlotClick(index, i)
                    }
                  }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}