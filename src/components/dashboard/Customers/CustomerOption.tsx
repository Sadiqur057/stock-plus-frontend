import { Eye, FilePenLine, MoreHorizontal, Trash2 } from "lucide-react";
import { SidebarMenuAction, SidebarMenuItem } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Modal } from "@/components/shared/Modal/Modal";
import { Button } from "@/components/ui/button";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import api from "@/interceptors/api";
import ViewCustomer from "./ViewCustomer";
import toast from "react-hot-toast";
import UpdateCustomer from "./UpdateCustomer";
import { CustomerType } from "./CustomersPage";

type Props = {
  customerId: string;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<CustomerType[], Error>>;
};

const CustomerOption = ({ customerId, refetch }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");
  const [selectedCustomerData, setSelectedCustomerData] =
    useState<CustomerType>({
      name: "",
      email: "",
      phone: "",
      address: "",
      _id: "",
      added_by: "",
    });

  const handleFetchCustomerData = async (id: string) => {
    setIsLoading(true);
    try {
      const result = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/customer/${id}`
      );
      setSelectedCustomerData(result?.data?.data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCustomer = async (id: string) => {
    try {
      const result = await api.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/delete-customer/${id}`
      );
      if (!result.data?.success) {
        return toast.error(result?.data?.message || "Something went wrong!");
      }
      toast.success(result?.data?.message);
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <SidebarMenuItem className="list-none border h-8 border-none">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuAction className="bg-gray-100 border w-6 rounded-full" showOnHover>
              <MoreHorizontal />
              <span className="sr-only">More</span>
            </SidebarMenuAction>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-fit p-1 rounded-lg"
            side={"left"}
            align={"start"}
          >
            <DropdownMenuItem
              onClick={() => {
                setIsViewModalOpen(true);
                handleFetchCustomerData(customerId);
              }}
            >
              <Eye className="text-muted-foreground" />
              <span>View Customer</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                setIsEditModalOpen(true);
                handleFetchCustomerData(customerId);
                setSelectedCustomerId(customerId);
              }}
            >
              <FilePenLine className="text-muted-foreground" />
              <span>Edit Customer</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedCustomerId(customerId);
              }}
            >
              <Trash2 className="text-red-700" />
              <span className="text-red-700">Delete Customer</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>

      {isViewModalOpen && (
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title="Customer Information"
          size="sm"
        >
          <ViewCustomer
            customerData={selectedCustomerData}
            isLoading={isLoading}
          />
        </Modal>
      )}
      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Update Customer Information"
          size="sm"
        >
          <UpdateCustomer
            customerData={selectedCustomerData}
            isLoading={isLoading}
            closeModal={() => setIsEditModalOpen(false)}
            customerId={selectedCustomerId}
            refetch={refetch}
          />
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Delete this customer?"
        >
          <form className="space-y-4">
            <div className="space-y-1"></div>
          </form>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold">
              Are you sure want to delete this customer?
            </h3>
            <p className="pb-6">
              You won&apos;t be able to recover this again!
            </p>
            <div className="flex justify-end gap-3">
              <Button
                onClick={() => setIsDeleteModalOpen(false)}
                className="py-3"
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                className="py-3"
                onClick={() => handleDeleteCustomer(selectedCustomerId)}
              >
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default CustomerOption;
