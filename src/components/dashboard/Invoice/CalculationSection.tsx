"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

interface CalculationShape {
  subtotal: number;
  tax: number;
  total: number;
  discount?: number;
}

type setCalculation = (calculation: CalculationShape) => void;

interface CalculationSectionProps {
  calculation: CalculationShape;
  setCalculation: setCalculation;
}

export function CalculationSection({
  calculation,
  setCalculation,
}: CalculationSectionProps) {
  const [showDiscount, setShowDiscount] = useState(false);
  const [discountError, setDiscountError] = useState<string | null>(null);

  const calculateTaxAndTotal = (subtotal: number, discountAmount: number) => {
    const subtotalAfterDiscount = subtotal - discountAmount;
    let tax = subtotalAfterDiscount * 0.1;
    tax = parseFloat(tax.toFixed(2));
    const total = subtotalAfterDiscount + tax;
    return { tax, total };
  };

  useEffect(() => {
    const discountAmount = calculation.discount || 0;
    const { tax, total } = calculateTaxAndTotal(
      calculation.subtotal,
      discountAmount
    );

    if (calculation.tax !== tax || calculation.total !== total) {
      setCalculation({
        ...calculation,
        tax,
        total,
      });
    }
  }, [calculation.subtotal, calculation.discount, setCalculation]);

  const handleDiscountChange = (value: string) => {
    if (value === "") {
      setCalculation({
        ...calculation,
        discount: 0,
      });
      return;
    }

    const numValue = Number.parseFloat(value);
    if (isNaN(numValue)) return;

    if (numValue > calculation.subtotal) {
      setDiscountError("Discount cannot be larger than subtotal");
      toast.error("Invalid discount! Discount cannot be larger than subtotal");
      return;
    }
    if (numValue < 0) {
      setDiscountError("Discount cannot be negative");
      toast.error("Invalid discount! Discount cannot be negative");
      return;
    }

    setDiscountError(null);
    setCalculation({
      ...calculation,
      discount: numValue,
    });
  };

  const removeDiscount = () => {
    setCalculation({
      ...calculation,
      discount: 0,
    });
    setDiscountError(null);
    setShowDiscount(false);
  };

  return (
    <div className="space-y-4 flex gap-10">
      <div className="w-full max-w-md ml-auto space-y-3">
        <div className="flex justify-between items-center text-gray-600">
          <span>Subtotal:</span>
          <span className="font-medium">
            BDT. {calculation.subtotal.toFixed(2)}
          </span>
        </div>

        <div>
          {!showDiscount && (
            <div className="flex justify-between items-center text-gray-600">
              <span>Have discount?</span>
              <Button
                variant="ghost"
                type="button"
                size="sm"
                className=""
                onClick={() => setShowDiscount(true)}
              >
                <Plus />
              </Button>
            </div>
          )}

          {showDiscount && (
            <div className="flex justify-between items-center text-gray-600">
              <span className="text-nowrap">Discount amount:</span>
              <div className="flex items-center justify-end space-x-2 w-full gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={removeDiscount}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  name="discount"
                  id="discount"
                  placeholder="Amount"
                  value={calculation.discount || ""}
                  onChange={(e) => handleDiscountChange(e.target.value)}
                  className={`max-w-32 py-2 text-right text-base font-medium ${
                    discountError ? "border-red-500" : ""
                  }`}
                />
              </div>
            </div>
          )}
        </div>

        {calculation.discount ? (
          <div className="flex justify-between items-center text-gray-600">
            <span>Discount:</span>
            <span className="font-medium">
              BDT. {calculation.discount.toFixed(2)}
            </span>
          </div>
        ) : (
          ""
        )}

        <div className="flex justify-between items-center text-gray-600">
          <span>Tax (10%):</span>
          <span className="font-medium">BDT. {calculation.tax.toFixed(2)}</span>
        </div>
        <div className="h-px bg-gray-200 my-2" />
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Total:</span>
          <span>BDT. {calculation.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
