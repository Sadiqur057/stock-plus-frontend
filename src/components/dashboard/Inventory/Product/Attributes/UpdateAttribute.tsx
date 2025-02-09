import React, { useEffect, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { AttributeType } from "./AttributePage";
import ButtonLoader from "@/components/shared/Loader/ButtonLoader";

type AttributeProps = {
  attributeData: AttributeType;
  isLoading: boolean;
  attributeId: string;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<AttributeType[], Error>>;
  closeModal: () => void;
};

type FormData = {
  name: string;
  description: string;
};

const UpdateAttribute = ({
  isLoading,
  attributeData,
  attributeId,
  refetch,
  closeModal,
}: AttributeProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (attributeData) {
      setFormData({
        name: attributeData.name ?? "",
        description: attributeData.description ?? "",
      });
    }
  }, [attributeData]);

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
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
          `${process.env.NEXT_PUBLIC_API_URL}/update-attribute/${attributeId}`,
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
              required
            />
          </div>
        </div>
        <div className="flex justify-between">
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <ButtonLoader />
            ) : (
              <>
                <ClipboardPlus className="mr-2 h-4 w-4" />
                Update Attribute
              </>
            )}
          </Button>
        </div>
      </form>
    </>
  );
};

export default UpdateAttribute;
