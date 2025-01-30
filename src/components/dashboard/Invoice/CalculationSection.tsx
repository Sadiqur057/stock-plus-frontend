"use client"

import { useState, useEffect } from "react"

interface CalculationSectionProps {
  subtotal: number
}

export function CalculationSection({ subtotal }: CalculationSectionProps) {
  const [calculation, setCalculation] = useState({
    subtotal: 0,
    tax: 0,
    total: 0,
  })

  useEffect(() => {
    const tax = subtotal * 0.1 // 10% tax
    const total = subtotal + tax

    setCalculation({
      subtotal,
      tax,
      total,
    })
  }, [subtotal])

  return (
    <div className="space-y-4">
      <div className="w-full max-w-md ml-auto space-y-3">
        <div className="flex justify-between items-center text-gray-600">
          <span>Subtotal:</span>
          <span className="font-medium">${calculation.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-gray-600">
          <span>Tax (10%):</span>
          <span className="font-medium">${calculation.tax.toFixed(2)}</span>
        </div>
        <div className="h-px bg-gray-200 my-2" />
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Total:</span>
          <span>${calculation.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

