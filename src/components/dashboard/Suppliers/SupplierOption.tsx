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
import ViewSupplier from "./ViewSupplier";
import toast from "react-hot-toast";
import UpdateSupplier from "./UpdateSupplier";
import { SupplierType } from "./SuppliersPage";

type Props = {
  supplierId: string;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<SupplierType[], Error>>;
};

const SupplierOption = ({ supplierId, refetch }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedSupplierId, setSelectedSupplierId] = useState<string>("");
  const [selectedSupplierData, setSelectedSupplierData] =
    useState<SupplierType>({
      name: "",
      email: "",
      phone: "",
      address: "",
      _id: "",
      added_by: "",
    });

  const handleFetchSupplierData = async (id: string) => {
    setIsLoading(true);
    console.log("id", id);
    try {
      const result = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/supplier/${id}`
      );
      setSelectedSupplierData(result?.data?.data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSupplier = async (id: string) => {
    try {
      const result = await api.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/delete-supplier/${id}`
      );
      if (!result.data?.success) {
        return toast.error(result?.data?.message || "Something went wrong!");
      }
      toast.success(result?.data?.message);
      refetch();
    } catch (error) {
      console.log(error);
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
                handleFetchSupplierData(supplierId);
              }}
            >
              <Eye className="text-muted-foreground" />
              <span>View Supplier</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                setIsEditModalOpen(true);
                handleFetchSupplierData(supplierId);
                setSelectedSupplierId(supplierId);
              }}
            >
              <FilePenLine className="text-muted-foreground" />
              <span>Edit Supplier</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedSupplierId(supplierId);
              }}
            >
              <Trash2 className="text-red-700" />
              <span className="text-red-700">Delete Supplier</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>

      {isViewModalOpen && (
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title="Supplier Information"
          size="sm"
        >
          <ViewSupplier
            supplierData={selectedSupplierData}
            isLoading={isLoading}
          />
        </Modal>
      )}
      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Update Supplier Information"
          size="lg"
        >
          <UpdateSupplier
            supplierData={selectedSupplierData}
            isLoading={isLoading}
            closeModal={() => setIsEditModalOpen(false)}
            supplierId={selectedSupplierId}
            refetch={refetch}
          />
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Delete this supplier?"
        >
          <form className="space-y-4">
            <div className="space-y-1"></div>
          </form>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold">
              Are you sure want to delete this supplier?
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
                onClick={() => handleDeleteSupplier(selectedSupplierId)}
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

export default SupplierOption;
