"use client";

import { useEffect } from "react";
import { CalculationShape } from "./CreateInvoicePage";

interface CalculationSectionProps {
  calculation: CalculationShape;
  setCalculation: (subtotal: CalculationShape) => void;
}

export function CalculationSection({
  calculation,
  setCalculation,
}: CalculationSectionProps) {
  useEffect(() => {
    const tax = calculation.subtotal * 0.1; 
    const total = calculation.subtotal + tax;

    if (calculation.tax !== tax || calculation.total !== total) {
      setCalculation({
        subtotal: calculation.subtotal, 
        tax,
        total,
      });
    }
  }, [calculation.subtotal, calculation.tax, calculation.total]); 

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
  );
}
