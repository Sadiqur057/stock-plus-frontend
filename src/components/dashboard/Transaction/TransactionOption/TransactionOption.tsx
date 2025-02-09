import { Eye, MoreHorizontal, Trash2 } from "lucide-react";
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
import ViewTransaction from "./ViewTransaction";
import toast from "react-hot-toast";
import { TransactionType } from "../TransactionPage";

type Props = {
  transactionId: string;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<TransactionType[], Error>>;
};

const TransactionOption = ({ transactionId, refetch }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  // const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedTransactionId, setSelectedTransactionId] =
    useState<string>("");
  const [selectedTransactionData, setSelectedTransactionData] =
    useState<TransactionType>({
      customer: {
        name: "",
        email: "",
      },
      payment_method: "",
      payment_description: "",
      _id: "",
      created_by_email: "",
      created_by_name: "",
      created_at: "",
      amount: 0,
    });

  const handleFetchTransactionData = async (id: string) => {
    setIsLoading(true);
    console.log("id", id);
    try {
      const result = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/transaction/${id}`
      );
      console.log("transaction result", result);
      setSelectedTransactionData(result?.data?.data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    try {
      const result = await api.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/delete-transaction/${id}`
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
            <SidebarMenuAction
              className="bg-gray-100 border w-6 rounded-full"
              showOnHover
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
            <DropdownMenuItem
              onClick={() => {
                setIsViewModalOpen(true);
                handleFetchTransactionData(transactionId);
              }}
            >
              <Eye className="text-muted-foreground" />
              <span>View Transaction</span>
            </DropdownMenuItem>

            {/* <DropdownMenuItem
              onClick={() => {
                setIsEditModalOpen(true);
                handleFetchTransactionData(transactionId);
                setSelectedTransactionId(transactionId);
              }}
            >
              <FilePenLine className="text-muted-foreground" />
              <span>Edit Transaction</span>
            </DropdownMenuItem> */}

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedTransactionId(transactionId);
              }}
            >
              <Trash2 className="text-red-700" />
              <span className="text-red-700">Delete Transaction</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>

      {isViewModalOpen && (
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title="Transaction Information"
          size="lg"
        >
          <ViewTransaction
            transactionData={selectedTransactionData}
            isLoading={isLoading}
          />
        </Modal>
      )}
      {/* {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Update Transaction Information"
          size="lg"
        >
          <UpdateTransaction
            transactionData={selectedTransactionData}
            isLoading={isLoading}
            closeModal={() => setIsEditModalOpen(false)}
            transactionId={selectedTransactionId}
            refetch={refetch}
          />
        </Modal>
      )} */}

      {isDeleteModalOpen && (
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Delete this transaction?"
        >
          <form className="space-y-4">
            <div className="space-y-1"></div>
          </form>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold">
              Are you sure want to delete this transaction?
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
                onClick={() => handleDeleteTransaction(selectedTransactionId)}
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

export default TransactionOption;
