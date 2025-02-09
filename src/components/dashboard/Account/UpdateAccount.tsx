import React from "react";
import { Modal } from "@/components/shared/Modal/Modal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import api from "@/interceptors/api";
import toast from "react-hot-toast";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { UserShape } from "@/types/user.type";

type userShape = {
  name: string;
  company_name: string;
  company_description: string;
  company_type: string;
  twitter_url?: string;
  facebook_url?: string;
  company_location: string;
  company_phone: string;
};

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  user: userShape;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<UserShape, Error>>;
};

const UpdateAccount = ({ isOpen, user, setIsOpen, refetch }: Props) => {
  const [formData, setFormData] = useState({
    name: user?.name,
    company_name: user?.company_name,
    company_description: user?.company_description,
    company_type: user?.company_type,
    twitter_url: user?.twitter_url,
    facebook_url: user?.facebook_url,
    company_location: user?.company_location,
    company_phone: user?.company_phone,
  });

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
    mutationFn: async (data: userShape) => {
      const result = await api.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/update-account`,
        data
      );
      if (!result?.data?.success) {
        return toast.error(
          result?.data?.message ||
            "Something Went Wrong. Please try again lated"
        );
      }
      toast.success(result?.data?.message);
      refetch();
      setIsOpen(false);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    mutate(formData);
  };
  return (
    <>
      <Modal
        size="lg"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Update Account"
      >
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              value={formData?.name}
              name="name"
              placeholder="e.g. John Doe"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="company_name">Company Name</Label>
            <Input
              id="company_name"
              value={formData?.company_name}
              name="company_name"
              placeholder="e.g. My Company"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="company_type">Company Type</Label>
            <Input
              id="company_type"
              value={formData?.company_type}
              name="company_type"
              placeholder="e.g. International Business"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="company_location">Company Location</Label>
            <Input
              id="company_location"
              value={formData?.company_location}
              name="company_location"
              placeholder="e.g. Dhaka, Bangladesh"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="company_phone">Company Phone</Label>
            <Input
              id="company_phone"
              value={formData?.company_phone}
              name="company_phone"
              placeholder="e.g. +880123456789"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="facebook_url">Facebook URL</Label>
            <Input
              id="facebook_url"
              value={formData?.facebook_url}
              name="facebook_url"
              placeholder="e.g. https://www.facebook.com/mycompany"
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="twitter_url">Twitter URL</Label>
            <Input
              id="twitter_url"
              value={formData?.twitter_url}
              name="twitter_url"
              placeholder="e.g. https://twitter.com/mycompany"
              onChange={handleInputChange}
            />
          </div>
          <div className="gap-1.5 flex flex-col md:col-span-2">
            <Label htmlFor="company_description">Company Description</Label>
            <Textarea
              rows={3}
              name="company_description"
              id="company_description"
              value={formData?.company_description}
              onChange={handleInputChange}
              placeholder="e.g. My Company is a ..."
            />
          </div>
          <div className="space-y-1 flex justify-end md:col-span-2">
            <Button size="lg">Submit</Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default UpdateAccount;
