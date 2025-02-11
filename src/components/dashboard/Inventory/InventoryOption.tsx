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
import toast from "react-hot-toast";
import ButtonLoader from "@/components/shared/Loader/ButtonLoader";
import Link from "next/link";
import { ItemType } from "./InventoryPage";

import CreatePayment from "./Report/CreatePayment";

type Props = {
  inventoryId: string;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<ItemType[], Error>>;
  due_amount: number;
};

const InventoryOption = ({ inventoryId, refetch, due_amount }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [selectedInventoryId, setSelectedInventoryId] = useState<string>("");

  const handleDeleteInventory = async (id: string) => {
    try {
      setLoading(true);
      const result = await api.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/inventory/${id}`
      );
      if (!result.data?.success) {
        return toast.error(result?.data?.message || "Something went wrong!");
      }
      toast.success(result?.data?.message);
      refetch();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SidebarMenuItem className="list-none border h-8 border-none">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuAction
              showOnHover
              className="bg-gray-100 border w-6 rounded-full"
            >
              <MoreHorizontal />
              <span className="sr-only">More</span>
            </SidebarMenuAction>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-fit p-1 rounded-lg"
            side={"left"}
            align={"start"}
          >
            <DropdownMenuItem>
              <Link
                href={`/dashboard/inventory/reports/${inventoryId}`}
                className="flex gap-1 items-center"
              >
                <Eye className="text-muted-foreground w-4" />
                <span>View Invoice</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setIsPaymentModalOpen(true);
              }}
            >
              <FilePenLine className="text-muted-foreground" />
              <span>Create Payment</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedInventoryId(inventoryId);
              }}
            >
              <Trash2 className="text-red-700" />
              <span className="text-red-700">Delete Inventory</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
      {isPaymentModalOpen && (
        <Modal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          title="Add payment"
          size="sm"
        >
          <CreatePayment
            refetch={refetch}
            invoiceId={inventoryId}
            due_amount={due_amount}
            closeModal={() => setIsPaymentModalOpen(false)}
          />
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Delete this inventory?"
        >
          <div className="space-y-3">
            <h3 className="text-xl font-semibold">
              Are you sure want to delete this inventory?
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
                disabled={loading}
                className="py-3"
                onClick={() => handleDeleteInventory(selectedInventoryId)}
              >
                {loading ? <ButtonLoader /> : "Delete"}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default InventoryOption;
