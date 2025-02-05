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
  useQuery,
} from "@tanstack/react-query";
import api from "@/interceptors/api";
import { ProductShape } from "@/types/product.type";
import ButtonLoader from "@/components/shared/Loader/ButtonLoader";

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

type Props = {
  closeModal?: React.Dispatch<React.SetStateAction<boolean>>;
  refetch?: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<ProductShape[], Error>>;
};

const AddNewProduct = ({ refetch, closeModal }: Props) => {
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    productName: "",
    company: "",
    quantity: "",
    purchasePrice: "",
    salePrice: "",
    remarks: "",
    created_at: new Date().toLocaleString(),
  });

  const { data: attributeList = [] } = useQuery({
    queryKey: ["attributes"],
    queryFn: async () => {
      const result = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/attributes`
      );
      if (!result?.data?.success) {
        toast.error(result?.data?.message || "Something went wrong");
        return [];
      }
      return result?.data?.data;
    },
  });

  const handleAddAttribute = () => {
    setAttributes([...attributes, { key: "", value: "" }]);
  };

  const handleRemoveAttribute = (index: number) => {
    setAttributes(attributes.filter((_, i) => i !== index));
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

  const { mutate } = useMutation({
    mutationFn: async (data: ProductData) => {
      try {
        const result = await api.post(
          `${process.env.NEXT_PUBLIC_API_URL}/add-product`,
          data
        );
        if (result?.data?.success) {
          toast.success(result?.data?.message);
          refetch?.();
          closeModal?.(false);
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
          toast.error(result?.data?.message || "Something went wrong!");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const processedAttributes = attributes.map((attr) =>
      attr.key === "new" ? { key: attr.newKey || "", value: attr.value } : attr
    );
    mutate({ ...formData, attributes: processedAttributes });
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
                  {attributeList.map((attr: { _id: string; name: string }) => (
                    <SelectItem key={attr._id} value={attr.name}>
                      {attr.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {attr.key === "new" && (
                <Input
                  placeholder="New attribute key"
                  value={attr.newKey || ""}
                  onChange={(e) =>
                    handleAttributeChange(index, "newKey", e.target.value)
                  }
                />
              )}
              <Input
                placeholder="Attribute value"
                value={attr.value}
                onChange={(e) =>
                  handleAttributeChange(index, "value", e.target.value)
                }
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => handleRemoveAttribute(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              className="w-1/2"
              onClick={handleAddAttribute}
            >
              <Plus className="h-4 w-4 mr-1" /> Add Attribute
            </Button>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <ButtonLoader />
              ) : (
                <>
                  <ClipboardPlus /> Add Product
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddNewProduct;
