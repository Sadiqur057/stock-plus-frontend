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
import ButtonLoader from "@/components/shared/Loader/ButtonLoader";

type FormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

type Props = {
  closeModal: () => void;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<ProductShape[], Error>>;
};

const AddSupplier = ({ refetch, closeModal }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { mutate } = useMutation({
    mutationFn: async (data: FormData) => {
      try {
        const result = await api.post(
          `${process.env.NEXT_PUBLIC_API_URL}/add-supplier`,
          data
        );
        console.log("checking result", result);
        if (!result.data.success) {
          return toast.error(result?.data?.message || "Something went wrong.");
        }
        toast.success(result?.data?.message);
        refetch();
        closeModal();
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    mutate(formData);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4 lg:space-y-6">
          <div className="space-y-1">
            <Label htmlFor="name">Supplier Name</Label>
            <Input
              id="name"
              value={formData?.name}
              name="name"
              type="text"
              placeholder="Enter supplier name"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Supplier Email</Label>
            <Input
              id="email"
              name="email"
              type="text"
              value={formData?.email}
              placeholder="Enter supplier email"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="phone">Supplier Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="text"
              placeholder="Enter supplier phone"
              value={formData?.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="address">Supplier Address</Label>
            <Input
              id="address"
              name="address"
              placeholder="Enter supplier address"
              type="text"
              value={formData?.address}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <ButtonLoader />
            ) : (
              <>
                <ClipboardPlus /> Add Supplier
              </>
            )}
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddSupplier;
