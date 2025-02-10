import React, { useEffect, useState } from "react";
import { SupplierType } from "./SuppliersPage";
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
import ButtonLoader from "@/components/shared/Loader/ButtonLoader";

type SupplierProps = {
  supplierData: SupplierType;
  isLoading: boolean;
  supplierId: string;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<SupplierType[], Error>>;
  closeModal: () => void;
};

type FormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

const UpdateSupplier = ({
  isLoading,
  supplierData,
  supplierId,
  refetch,
  closeModal,
}: SupplierProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (supplierData) {
      setFormData({
        name: supplierData.name ?? "",
        email: supplierData.email ?? "",
        phone: supplierData.phone ?? "",
        address: supplierData.address ?? "",
      });
    }
  }, [supplierData]);

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
        const result = await api.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/update-supplier/${supplierId}`,
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
    e.preventDefault();
    setLoading(true);
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
                <ClipboardPlus /> Update Supplier
              </>
            )}
          </Button>
        </div>
      </form>
    </>
  );
};

export default UpdateSupplier;
