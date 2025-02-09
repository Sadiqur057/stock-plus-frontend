import { useEffect, useCallback, useState, useRef } from "react";
import { Plus, Minus, Trash } from "lucide-react";
import Select from "react-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/interceptors/api";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CalculationShape } from "../../Invoice/CreateInvoicePage";
import { Product } from "./AddProductsPage";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  onTotalChange: React.Dispatch<React.SetStateAction<CalculationShape>>;
  products: Product[];
  setProducts: (product: Product[] | []) => void;
}

type Option = {
  value: string;
  label: string;
};

const ProductSection = ({ products, setProducts, onTotalChange }: Props) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const [disabledCheckboxIds, setDisabledCheckboxIds] = useState<Set<string>>(
    new Set()
  );
  const [disabledProductIds, setDisabledProductIds] = useState<Set<string>>(
    new Set()
  );

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
        temp_id: generateObjectId(),
        isNew: true,
        productName: "",
        company: "",
        salePrice: 0,
        quantity: 1,
        purchasePrice: 0,
        existing: false,
      };
      if (updatedProducts[index].temp_id) {
        setDisabledCheckboxIds((prev) =>
          new Set(prev).add(updatedProducts[index].temp_id!)
        );
      }
    } else {
      if (updatedProducts[index]?.temp_id) {
        setDisabledCheckboxIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(updatedProducts[index]!.temp_id!);
          return newSet;
        });
      }

      const isDuplicate = products.some(
        (p) =>
          p.temp_id === option.value &&
          p.temp_id !== updatedProducts[index].temp_id
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
          temp_id: selectedProduct._id,
          purchasePrice: selectedProduct.purchasePrice || 0,
          productName: selectedProduct.productName,
          company: selectedProduct.company || "",
          salePrice: selectedProduct.salePrice || 0,
          quantity: 1,
          existing: true,
          isNew: false,
        };
        setDisabledProductIds((prev) => new Set(prev).add(selectedProduct._id));
      }
    }

    setProducts(updatedProducts);
  };

  const toggleExisting = (index: number) => {
    const updatedProducts = [...products];
    const product = updatedProducts[index];

    const newDisabledProductIds = new Set(disabledProductIds);
    if (product.existing && product.temp_id) {
      newDisabledProductIds.delete(product?.temp_id);
    } else {
      if (product.temp_id) {
        newDisabledProductIds.add(product?.temp_id);
      }
    }

    setDisabledProductIds(newDisabledProductIds);
    updatedProducts[index].existing = !product.existing;
    setProducts(updatedProducts);
  };

  const calculateAmount = (price: number, quantity: number) => price * quantity;

  const calculateTotal = useCallback(
    (products: Product[]) =>
      products.reduce(
        (sum, product) =>
          sum + calculateAmount(product.purchasePrice, product.quantity),
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
        <Table className="min-w-[1160px]">
          <TableHeader>
            <TableRow>
              <TableHead className="">Select Product</TableHead>
              <TableHead className="">Product Name</TableHead>
              <TableHead className="">Company</TableHead>
              <TableHead className="">Purchase Price</TableHead>
              <TableHead className="">Sell Price</TableHead>
              <TableHead className="">Quantity</TableHead>
              <TableHead className="">Mark as</TableHead>
              <TableHead className="">
                Total <span className="text-[10px]">(BDT)</span>
              </TableHead>
              <TableHead className=""></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Select
                    options={productOptions}
                    value={
                      productOptions.find(
                        (option) => option.value === String(product.temp_id)
                      ) || null
                    }
                    menuPortalTarget={document.body}
                    onChange={(option) => handleProductChange(option, index)}
                    className="react-select-container min-w-[160px]"
                    classNamePrefix="react-select"
                    onInputChange={handleSearchChange}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    placeholder="Product Name"
                    value={product.productName}
                    disabled={
                      product.temp_id
                        ? disabledProductIds.has(product.temp_id)
                        : false
                    }
                    className="min-w-[160px]"
                    onChange={(e) => {
                      const updatedProducts = [...products];
                      updatedProducts[index].productName = e.target.value;
                      setProducts(updatedProducts);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    placeholder="Company"
                    value={product.company}
                    className="min-w-[160px]"
                    disabled={
                      product.temp_id
                        ? disabledProductIds.has(product.temp_id)
                        : false
                    }
                    onChange={(e) => {
                      const updatedProducts = [...products];
                      updatedProducts[index].company = e.target.value;
                      setProducts(updatedProducts);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={product.purchasePrice}
                    disabled={
                      product.temp_id
                        ? disabledProductIds.has(product.temp_id)
                        : false
                    }
                    className="min-w-[100px]"
                    onChange={(e) => {
                      const updatedProducts = [...products];
                      updatedProducts[index].purchasePrice =
                        Number.parseFloat(e.target.value) || 0;
                      setProducts(updatedProducts);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={product.salePrice}
                    disabled={
                      product.temp_id
                        ? disabledProductIds.has(product.temp_id)
                        : false
                    }
                    className="min-w-[100px]"
                    onChange={(e) => {
                      const updatedProducts = [...products];
                      updatedProducts[index].salePrice =
                        Number.parseFloat(e.target.value) || 0;
                      setProducts(updatedProducts);
                    }}
                  />
                </TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell>
                  <div className="flex items-center tooltip gap-1.5">
                    <p className="tooltip-text text-center">
                      {product?.existing
                        ? "Quantity of the product will be increased"
                        : "New product will be added to inventory"}
                    </p>
                    <Checkbox
                      id={`existing-product-${index}`}
                      checked={product.existing}
                      disabled={
                        (product.temp_id &&
                          disabledCheckboxIds.has(product.temp_id)) ||
                        product.isNew === true
                      }
                      onCheckedChange={() => toggleExisting(index)}
                    />
                    <label
                      htmlFor={`existing-product-${index}`}
                      className="text-sm text-nowrap font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Existing?
                    </label>
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  {calculateAmount(
                    product.purchasePrice,
                    product.quantity
                  ).toFixed(2)}
                </TableCell>
                <TableCell>
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Button
        variant="outline"
        type="button"
        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-dashed border-2"
        onClick={() =>
          setProducts([
            ...products,
            {
              temp_id: generateObjectId(),
              productName: "",
              company: "",
              salePrice: 0,
              purchasePrice: 0,
              attributes: "",
              quantity: 1,
              existing: false,
              isNew: true,
            },
          ])
        }
      >
        <Plus className="h-4 w-4 mr-2" />
        Add More
      </Button>
    </div>
  );
};

export default ProductSection;
