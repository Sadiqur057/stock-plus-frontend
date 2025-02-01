import { AxiosResponse } from "axios";
import { useState } from "react";
import { ClipboardPlus, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import toast from "react-hot-toast";
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from "@tanstack/react-query";
import api from "@/interceptors/api";
import { ProductShape } from "@/types/product.type";

type Attribute = {
  key: string;
  value: string;
  newKey?: string;
};
type FormData = {
  productName: string;
  company: string;
  quantity: string;
  purchasePrice?: string;
  salePrice?: string;
  remarks?: string;
  created_at: string;
};
type ProductData = FormData & {
  attributes?: Attribute[];
};

type ApiResponse = {
  success: boolean;
  message: string;
};

type Props = {
  closeModal?: React.Dispatch<React.SetStateAction<boolean>>;
  refetch?: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<ProductShape[], Error>>;
};

const AddNewProduct = ({ refetch, closeModal }: Props) => {
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [formData, setFormData] = useState({
    productName: "",
    company: "",
    quantity: "",
    purchasePrice: "",
    salePrice: "",
    remarks: "",
    created_at: new Date().toLocaleString(),
  });

  const existingAttributes = ["Color", "Size", "Material", "Weight"];

  const handleAddAttribute = () => {
    setAttributes([...attributes, { key: "", value: "" }]);
  };

  const handleRemoveAttribute = (index: number) => {
    const newAttributes = attributes.filter((_, i) => i !== index);
    setAttributes(newAttributes);
  };

  const handleAttributeChange = (
    index: number,
    field: "key" | "value" | "newKey",
    value: string
  ) => {
    const newAttributes = [...attributes];
    newAttributes[index][field] = value;

    if (
      field === "key" &&
      value !== "new" &&
      attributes.some((attr, i) => attr.key === value && i !== index)
    ) {
      toast.error("This attribute is already added.");
      return;
    }

    if (field === "key" && value === "new") {
      newAttributes[index].newKey = "";
    }

    setAttributes(newAttributes);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { mutate } = useMutation<
    AxiosResponse<ApiResponse>,
    Error,
    ProductData
  >({
    mutationFn: async (data) => {
      return await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/add-product`,
        data
      );
    },
    onSuccess: (result) => {
      if (result?.data?.success) {
        toast.success(result?.data?.message);
        if (refetch) {
          refetch();
        }
        if (closeModal) {
          closeModal(false);
        }
        setFormData({
          productName: "",
          company: "",
          quantity: "",
          purchasePrice: "",
          salePrice: "",
          remarks: "",
          created_at: "",
        });
        setAttributes([]);
      } else {
        toast.error(
          result?.data?.message ||
            "Something went wrong! Please try again later"
        );
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const processedAttributes = attributes.map((attr) =>
      attr.key === "new" ? { key: attr.newKey || "", value: attr.value } : attr
    );

    const data: ProductData = {
      ...formData,
      attributes: processedAttributes,
    };
    mutate(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div className="space-y-1">
            <Label htmlFor="productName">Product Name</Label>
            <Input
              id="productName"
              value={formData?.productName}
              name="productName"
              placeholder="Enter Product Name"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              value={formData?.company}
              placeholder="Enter Company Name"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              placeholder="Enter Product Quantity"
              value={formData?.quantity}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="purchasePrice">Purchase Price</Label>
            <Input
              id="purchasePrice"
              name="purchasePrice"
              placeholder="Enter Purchase Price"
              type="number"
              step="0.01"
              value={formData?.purchasePrice}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="salePrice">Sale Price</Label>
            <Input
              id="salePrice"
              name="salePrice"
              type="number"
              placeholder="Enter Sale Price"
              step="0.01"
              value={formData?.salePrice}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="remarks">Remarks</Label>
            <Input
              id="remarks"
              name="remarks"
              type="text"
              placeholder="Enter Remarks"
              value={formData?.remarks}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="space-y-4">
          {attributes.map((attr, index) => (
            <div key={index} className="flex items-center space-x-4">
              <Select
                value={attr.key}
                onValueChange={(value) =>
                  handleAttributeChange(index, "key", value)
                }
              >
                <SelectTrigger className="max-w-[180px] lg:min-w-[180px] w-fit py-[22px] px-4">
                  <SelectValue placeholder="Select attribute" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">Add New</SelectItem>
                  {existingAttributes.map((attr) => (
                    <SelectItem key={attr} value={attr}>
                      {attr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {attr.key === "new" ? (
                <Input
                  placeholder="New attribute key"
                  value={attr.newKey || ""}
                  onChange={(e) =>
                    handleAttributeChange(index, "newKey", e.target.value)
                  }
                  className="max-w-[180px]"
                />
              ) : null}
              <Input
                placeholder="Attribute value"
                value={attr.value}
                onChange={(e) =>
                  handleAttributeChange(index, "value", e.target.value)
                }
                className="flex-grow"
              />
              <Button
                type="button"
                variant="outline"
                className="px-[22px] py-[22px] hover:text-white hover:bg-blue-900"
                size="icon"
                onClick={() => handleRemoveAttribute(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <div className="flex items-center gap-5 justify-between">
            <Button
              type="button"
              onClick={handleAddAttribute}
              className="text-blue-800 bg-transparent border-blue-800 border hover:text-white hover:bg-blue-900 w-1/2"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Attribute
            </Button>
            <Button type="submit" className="w-full">
              <ClipboardPlus /> Add Product
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddNewProduct;
