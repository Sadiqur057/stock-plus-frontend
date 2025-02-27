"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { CalculationShape, PaymentDataType } from "./CreateInvoicePage";
import { Modal } from "@/components/shared/Modal/Modal";
import AddPayment from "./AddPayment";
import { useQuery } from "@tanstack/react-query";
import api from "@/interceptors/api";
import { getCurrency } from "@/lib/utils";

type setCalculation = (calculation: CalculationShape) => void;

interface CalculationSectionProps {
  calculation: CalculationShape;
  setCalculation: setCalculation;
  setPaymentData: React.Dispatch<React.SetStateAction<PaymentDataType>>;
  paymentData: PaymentDataType;
  setPaymentMethod: (method: string) => void;
  paymentMethod: string;
}

export function CalculationSection({
  calculation,
  setCalculation,
  paymentData,
  setPaymentData,
  setPaymentMethod,
  paymentMethod,
}: CalculationSectionProps) {
  const [showDiscount, setShowDiscount] = useState(false);
  const [discountError, setDiscountError] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data: vat } = useQuery({
    queryKey: ["vat"],
    queryFn: async () => {
      const result = await api.get("/vat");
      return result?.data?.vat_rate;
    },
  });

  const calculateTaxAndTotal = (subtotal: number, discountAmount: number) => {
    const subtotalAfterDiscount = subtotal - discountAmount;
    const vat_percent = vat ? vat / 100 : 0;
    let tax = subtotalAfterDiscount * vat_percent;
    tax = parseFloat(tax.toFixed(2));
    const total = subtotalAfterDiscount + tax;
    return { tax, total };
  };

  useEffect(() => {
    if (paymentData?.amount) {
      return setCalculation({
        ...calculation,
        paid: paymentData?.amount,
        due: calculation.total - paymentData?.amount,
      });
    }
    setCalculation({
      ...calculation,
      paid: 0,
      due: calculation.total,
    });
  }, [paymentData?.amount]);

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
  }, [
    calculation.subtotal,
    calculation.discount,
    setCalculation,
    calculation.paid,
  ]);

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

  const removePayment = () => [
    setPaymentMethod(""),
    setPaymentData({
      amount: null,
      payment_description: "",
    }),
  ];
  const currency = getCurrency();
  return (
    <div className="space-y-4 flex gap-10">
      <div className="w-full max-w-md ml-auto space-y-3">
        <div className="flex justify-between items-center text-gray-600">
          <span>Subtotal:</span>
          <span className="font-medium">
            {currency}. {calculation.subtotal.toFixed(2)}
          </span>
        </div>

        <div>
          {!showDiscount && (
            <div className="flex justify-between items-center text-gray-600">
              <span>Have discount?</span>
              <Button
                variant="outline"
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
              {currency}. {calculation.discount.toFixed(2)}
            </span>
          </div>
        ) : (
          ""
        )}

        <div className="flex justify-between items-center text-gray-600">
          <span>Vat ({vat ? vat : 0}%):</span>
          <span className="font-medium">
            {currency}. {calculation.tax.toFixed(2)}
          </span>
        </div>
        <div>
          <div className="flex justify-between items-center text-gray-600">
            <span>
              {paymentData?.amount ? "Remove Payment?" : "Add Payment?"}
            </span>
            <div>
              {paymentData?.amount ? (
                <Button
                  variant="outline"
                  type="button"
                  size="sm"
                  className=""
                  onClick={removePayment}
                >
                  <Trash2 />
                </Button>
              ) : (
                <Button
                  variant="outline"
                  type="button"
                  size="sm"
                  className=""
                  onClick={() => {
                    setShowPayment(true);
                    setIsModalOpen(true);
                  }}
                >
                  <Plus />
                </Button>
              )}
            </div>
          </div>

          {showPayment && (
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Add Payment"
              size="sm"
            >
              <AddPayment
                setPaymentMethod={setPaymentMethod}
                paymentData={paymentData}
                setPaymentData={setPaymentData}
                due_amount={calculation.total}
                closeModal={() => setIsModalOpen(false)}
                paymentMethod={paymentMethod}
              />
            </Modal>
          )}
        </div>

        <div className="h-px bg-gray-200 my-2" />
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Total:</span>
          <span>
            {currency}. {calculation.total.toFixed(2)}
          </span>
        </div>
        {calculation.paid ? (
          <>
            <div className="flex justify-between items-center text-gray-600">
              <span>Paid:</span>
              <span className="font-medium">
                {currency}. {calculation.paid.toFixed(2)}
              </span>
            </div>
            <div className="h-px bg-gray-200 my-2" />
            <div className="flex justify-between items-center text-gray-600">
              <span>Due:</span>
              <span className="font-medium">
                {currency}. {(calculation.total - calculation.paid).toFixed(2)}
              </span>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
