import React, { useEffect, useState } from "react";
import { CustomerType } from "./CustomersPage";
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "@/interceptors/api";
import { ClipboardPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/Loader";

type CustomerProps = {
  customerData: CustomerType;
  isLoading: boolean;
  customerId: string;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<CustomerType[], Error>>;
  closeModal: () => void;
};

type FormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

const UpdateCustomer = ({
  isLoading,
  customerData,
  customerId,
  refetch,
  closeModal,
}: CustomerProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (customerData) {
      setFormData({
        name: customerData.name ?? "",
        email: customerData.email ?? "",
        phone: customerData.phone ?? "",
        address: customerData.address ?? "",
      });
    }
  }, [customerData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { mutate } = useMutation({
    mutationFn: async (data: FormData) => {
      const result = await api.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/update-customer/${customerId}`,
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

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4 lg:space-y-6">
          <div className="space-y-1">
            <Label htmlFor="name">Customer Name</Label>
            <Input
              id="name"
              value={formData?.name}
              name="name"
              type="text"
              placeholder="Enter customer name"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Customer Email</Label>
            <Input
              id="email"
              name="email"
              type="text"
              value={formData?.email}
              placeholder="Enter customer email"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="phone">Customer Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="text"
              placeholder="Enter customer phone"
              value={formData?.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="address">Customer Address</Label>
            <Input
              id="address"
              name="address"
              placeholder="Enter customer address"
              type="text"
              value={formData?.address}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <Button type="submit" className="w-full">
            <ClipboardPlus /> Update Customer
          </Button>
        </div>
      </form>
    </>
  );
};

export default UpdateCustomer;
