"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
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
import BreadCrumb from "@/components/shared/dashboard/BreadCrumb";
import toast from "react-hot-toast";

type Attribute = {
  key: string;
  value: string;
};

export default function AddProductPage() {
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [newAttributeKey, setNewAttributeKey] = useState("");
  const [formData, setFormData] = useState({
    productName: "",
    company: "",
    quantity: "",
    purchasePrice: "",
    salePrice: "",
    remarks: "",
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
    field: "key" | "value",
    value: string
  ) => {
    if (
      field === "key" &&
      attributes.some((attr, i) => attr.key === value && i !== index)
    ) {
      toast.error(
        "This attribute is already added."
      );
      return;
    }

    const newAttributes = [...attributes];
    newAttributes[index][field] = value;
    setAttributes(newAttributes);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      attributes,
    };
    console.log(data);
  };

  const breadcrumbList = [
    {
      name: "Products",
      link: "/dashboard/products",
    },
    {
      name: "Add Product",
      link: "/dashboard/products/add-product",
    },
  ];

  return (
    <div className="md:px-6 w-full container mb-6">
      <BreadCrumb breadcrumbList={breadcrumbList} />
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
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
            <Label htmlFor="salePrice">Remarks</Label>
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
          <h2 className="text-xl mt-2 font-semibold">Add Product Attributes</h2>
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
                  value={newAttributeKey}
                  onChange={(e) => setNewAttributeKey(e.target.value)}
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
                className="px-[22px] py-[22px] border-blue-800 text-blue-900 hover:text-white hover:bg-blue-900"
                size="icon"
                onClick={() => handleRemoveAttribute(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={handleAddAttribute}
            className="mt-2 bg-blue-800 hover:bg-blue-900"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Attribute
          </Button>
        </div>

        <Button type="submit" className="w-full">
          Add Product
        </Button>
      </form>
    </div>
  );
}
