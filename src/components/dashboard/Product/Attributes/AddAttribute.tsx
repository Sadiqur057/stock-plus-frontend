import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import toast from "react-hot-toast";
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from "@tanstack/react-query";
import api from "@/interceptors/api";
import { ProductShape } from "@/types/product.type";
import { ClipboardPlus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

type FormData = {
  name: string;
  description: string;

};

type Props = {
  closeModal: () => void;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<ProductShape[], Error>>;
};


const AddAttribute = ({ refetch, closeModal }: Props) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleInputChange = (    e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { mutate } = useMutation({
    mutationFn: async (data: FormData) => {
      const result = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/add-attribute`,
        data
      );
      console.log("checking result", result);
      if (!result.data.success) {
        return toast.error(result?.data?.message || "Something went wrong.");
      }
      toast.success(result?.data?.message);
      refetch();
      closeModal();
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4 lg:space-y-6">
          <div className="space-y-1">
            <Label htmlFor="name">Attribute Name</Label>
            <Input
              id="name"
              value={formData?.name}
              name="name"
              type="text"
              placeholder="Enter attribute name"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2 flex flex-col">
            <Label htmlFor="description">Attribute Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData?.description}
              placeholder="Enter attribute description"
              onChange={handleInputChange}
            />
          </div>

        </div>
        <div className="flex justify-between">
          <Button type="submit" className="w-full">
            <ClipboardPlus /> Add Attribute
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddAttribute;
