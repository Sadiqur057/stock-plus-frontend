"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Minus, Trash } from "lucide-react";
import Select from "react-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Product = {
  id: string;
  name: string;
  company: string;
  price: number;
  quantity: number;
};

const existingProducts = {
  "1": { id: "1", name: "Product A", company: "Company X", price: 100 },
  "2": { id: "2", name: "Product B", company: "Company Y", price: 200 },
  "3": { id: "3", name: "Product C", company: "Company Z", price: 150 },
};

const productOptions = [
  { value: "new", label: "+ Add New Product" },
  ...Object.values(existingProducts).map((product) => ({
    value: product.id,
    label: product.name,
  })),
];

interface ProductSectionProps {
  onTotalChange: (total: number) => void;
}

type Option = {
  value: string;
  label: string;
};

export function ProductSection({ onTotalChange }: ProductSectionProps) {
  const [products, setProducts] = useState<Product[]>([]);

  const calculateAmount = (price: number, quantity: number) => {
    return price * quantity;
  };

  const calculateTotal = useCallback(
    (products: Product[]) => {
      return products.reduce(
        (sum, product) =>
          sum + calculateAmount(product.price, product.quantity),
        0
      );
    },
    [products]
  );

  useEffect(() => {
    onTotalChange(calculateTotal(products));
  }, [products, onTotalChange, calculateTotal]);

  const handleProductChange = (option: Option | null, index: number) => {
    const updatedProducts = [...products];
    if (option === null) return;
    if (option.value === "new") {
      updatedProducts[index] = {
        id: Date.now().toString(),
        name: "",
        company: "",
        price: 0,
        quantity: 1,
      };
    } else {
      const selectedProduct =
        existingProducts[option.value as keyof typeof existingProducts];
      updatedProducts[index] = {
        ...selectedProduct,
        quantity: 1,
      };
    }
    setProducts(updatedProducts);
  };

  const updateProduct = (
    index: number,
    field: keyof Product,
    value: string | number
  ) => {
    const updatedProducts = [...products];
    updatedProducts[index] = { ...updatedProducts[index], [field]: value };
    setProducts(updatedProducts);
  };

  const adjustQuantity = (index: number, increment: boolean) => {
    const updatedProducts = [...products];
    const currentQuantity = updatedProducts[index].quantity;
    updatedProducts[index].quantity = increment
      ? currentQuantity + 1
      : Math.max(1, currentQuantity - 1);
    setProducts(updatedProducts);
  };

  const addProduct = () => {
    setProducts([
      ...products,
      {
        id: Date.now().toString(),
        name: "",
        company: "",
        price: 0,
        quantity: 1,
      },
    ]);
  };

  const removeProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto">
        <div className="rounded-lg border border-gray-200  min-w-[1160px]">
          <div className="grid grid-cols-12 gap-4 bg-gray-50 p-4 rounded-t-lg text-sm font-medium text-gray-600 ">
            <div className="col-span-2">Select Product</div>
            <div className="col-span-2">Product Name</div>
            <div className="col-span-2">Company</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-2">Quantity</div>
            <div className="col-span-1">Amount</div>
            <div className="col-span-1"></div>
          </div>

          <div className="divide-y divide-gray-200">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="grid grid-cols-12 gap-4 p-4 items-center"
              >
                <div className="col-span-2">
                  <Select
                    options={productOptions}
                    value={
                      productOptions.find(
                        (option) => option.value === product.id
                      ) || null
                    }
                    menuPortalTarget={document.body}
                    onChange={(option) => handleProductChange(option, index)}
                    className="react-select-container min-w-[180px]"
                    classNamePrefix="react-select"
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    placeholder="Product Name"
                    value={product.name}
                    className="min-w-[180px]"
                    onChange={(e) =>
                      updateProduct(index, "name", e.target.value)
                    }
                  />
                </div>

                <div className="col-span-2">
                  <Input
                    placeholder="Company"
                    value={product.company}
                    className="min-w-[180px]"
                    onChange={(e) =>
                      updateProduct(index, "company", e.target.value)
                    }
                  />
                </div>

                <div className="col-span-2">
                  <Input
                    type="number"
                    value={product.price}
                    onChange={(e) =>
                      updateProduct(
                        index,
                        "price",
                        Number.parseFloat(e.target.value) || 0
                      )
                    }
                    className="text-right"
                  />
                </div>

                <div className="col-span-2">
                  <div className="flex items-center space-x-2 border w-fit p-1 border-gray-100 rounded-md">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => adjustQuantity(index, false)}
                      className="h-9 w-9 bg-gray-200"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <p className="px-1 min-w-10 text-center">
                      {product?.quantity}
                    </p>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => adjustQuantity(index, true)}
                      className="h-9 w-9 bg-gray-200"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="col-span-1 font-medium">
                  ${calculateAmount(product.price, product.quantity).toFixed(2)}
                </div>

                <div className="col-span-1">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeProduct(index)}
                    className="w-8 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent"
                  >
                    <Trash />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-dashed border-2"
        onClick={addProduct}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add New Row
      </Button>
    </div>
  );
}
