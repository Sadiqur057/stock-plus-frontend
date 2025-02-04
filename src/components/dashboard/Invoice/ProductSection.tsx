"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import { Plus, Minus, Trash } from "lucide-react";
import Select from "react-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalculationShape, Product } from "./CreateInvoicePage";
import api from "@/interceptors/api";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
// import toast from "react-hot-toast";

interface ProductSectionProps {
  onTotalChange: React.Dispatch<React.SetStateAction<CalculationShape>>;
  products: Product[];
  setProducts: (product: Product[] | []) => void;
}

type Option = {
  value: string;
  label: string;
};

export function ProductSection({
  products,
  setProducts,
  onTotalChange,
}: ProductSectionProps) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const generateObjectId = () => {
    return Array.from(crypto.getRandomValues(new Uint8Array(12)))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  const { data: productList, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
        {
          params: {
            search: searchKeyword || null,
          },
        }
      );
      return response.data?.data || [];
    },
    staleTime: 5000,
  });

  const productOptions = [
    { value: "new", label: "+ Add New Product" },
    ...(productList?.map((product: Product) => ({
      value: product._id,
      label: product.productName,
    })) || []),
  ];

  const handleSearchChange = (newValue: string) => {
    setSearchKeyword(newValue);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      refetch();
    }, 500);
  };

  const handleProductChange = (option: Option | null, index: number) => {
    if (!option) return;

    const updatedProducts = [...products];

    if (option.value === "new") {
      updatedProducts[index] = {
        _id: generateObjectId(),
        productName: "",
        company: "",
        salePrice: 0,
        quantity: 1,
      };
    } else {
      const isDuplicate = products.some(
        (p) => p._id === option.value && p._id !== updatedProducts[index]._id
      );

      if (isDuplicate) {
        toast.error("This product has already been added!");
        return;
      }

      const selectedProduct = productList?.find(
        (product: Product) => product._id === option.value
      );

      if (selectedProduct) {
        updatedProducts[index] = {
          _id: selectedProduct._id,
          productName: selectedProduct.productName,
          company: selectedProduct.company || "",
          salePrice: selectedProduct.salePrice || 0,
          quantity: 1,
        };
      }
    }

    setProducts(updatedProducts);
  };

  const calculateAmount = (price: number, quantity: number) => price * quantity;

  const calculateTotal = useCallback(
    (products: Product[]) =>
      products.reduce(
        (sum, product) =>
          sum + calculateAmount(product.salePrice, product.quantity),
        0
      ),
    [products]
  );

  useEffect(() => {
    const subtotal = calculateTotal(products);
    onTotalChange((prevState: CalculationShape) => ({
      ...prevState,
      subtotal,
    }));
  }, [products, onTotalChange, calculateTotal]);

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto">
        <div className="rounded-lg border border-gray-200 min-w-[1160px]">
          <div className="grid grid-cols-12 gap-4 bg-gray-50 p-4 rounded-t-lg text-sm font-medium text-gray-600">
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
                key={product._id}
                className="grid grid-cols-12 gap-4 p-4 items-center"
              >
                <div className="col-span-2">
                  <Select
                    options={productOptions}
                    value={
                      productOptions.find(
                        (option) => option.value === String(product._id)
                      ) || null
                    }
                    menuPortalTarget={document.body}
                    onChange={(option) => handleProductChange(option, index)}
                    className="react-select-container min-w-[180px]"
                    classNamePrefix="react-select"
                    onInputChange={handleSearchChange}
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    placeholder="Product Name"
                    value={product.productName}
                    className="min-w-[180px]"
                    onChange={(e) => {
                      const updatedProducts = [...products];
                      updatedProducts[index].productName = e.target.value;
                      setProducts(updatedProducts);
                    }}
                  />
                </div>

                <div className="col-span-2">
                  <Input
                    placeholder="Company"
                    value={product.company}
                    className="min-w-[180px]"
                    onChange={(e) => {
                      const updatedProducts = [...products];
                      updatedProducts[index].company = e.target.value;
                      setProducts(updatedProducts);
                    }}
                  />
                </div>

                <div className="col-span-2">
                  <Input
                    type="number"
                    value={product.salePrice}
                    onChange={(e) => {
                      const updatedProducts = [...products];
                      updatedProducts[index].salePrice =
                        parseFloat(e.target.value) || 0;
                      setProducts(updatedProducts);
                    }}
                    className="text-right"
                  />
                </div>

                <div className="col-span-2">
                  <div className="flex items-center space-x-2 border w-fit p-1 border-gray-100 rounded-md">
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => {
                        const updatedProducts = [...products];
                        updatedProducts[index].quantity = Math.max(
                          1,
                          updatedProducts[index].quantity - 1
                        );
                        setProducts(updatedProducts);
                      }}
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
                      type="button"
                      onClick={() => {
                        const updatedProducts = [...products];
                        updatedProducts[index].quantity += 1;
                        setProducts(updatedProducts);
                      }}
                      className="h-9 w-9 bg-gray-200"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="col-span-1 font-medium">
                  $
                  {calculateAmount(product.salePrice, product.quantity).toFixed(
                    2
                  )}
                </div>

                <div className="col-span-1">
                  <Button
                    variant="destructive"
                    size="sm"
                    type="button"
                    onClick={() => {
                      const updatedProducts = products.filter(
                        (_, i) => i !== index
                      );
                      setProducts([...updatedProducts]);
                    }}
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
        type="button"
        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-dashed border-2"
        onClick={() =>
          setProducts([
            ...products,
            {
              _id: generateObjectId(),
              productName: "",
              company: "",
              salePrice: 0,
              quantity: 1,
            },
          ])
        }
      >
        <Plus className="h-4 w-4 mr-2" />
        Add New Row
      </Button>
    </div>
  );
}
