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
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import CreateTransaction from "./CreateTransaction";
import { Invoice } from "@/types/invoice.type";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import api from "@/interceptors/api";
import toast from "react-hot-toast";
// import UpdateInvoice from "./UpdateInvoice";
// import { InvoiceType } from "./InvoicesPage";

type Props = {
  invoiceId: string;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<Invoice[], Error>>;
  due_amount: number;
};

const InvoiceOption = ({ invoiceId, refetch, due_amount }: Props) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  // const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string>("");
  //
  const handleDeleteInvoice = async (id: string) => {
    try {
      const result = await api.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/delete-invoice/${id}`
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
            <DropdownMenuItem>
              <Link
                href={`/dashboard/invoices/${invoiceId}`}
                className="flex items-center gap-2 text-sm w-full"
              >
                <Eye className="text-muted-foreground w-4" />
                <span>View</span>
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

            {/* <DropdownMenuItem
              onClick={() => {
                setIsEditModalOpen(true);
                handleFetchInvoiceData(invoiceId);
                setSelectedInvoiceId(invoiceId);
              }}
            >
              <FilePenLine className="text-muted-foreground" />
              <span>Edit Invoice</span>
            </DropdownMenuItem> */}

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedInvoiceId(invoiceId);
              }}
            >
              <Trash2 className="text-red-700" />
              <span className="text-red-700">Delete Invoice</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>

      {isPaymentModalOpen && (
        <Modal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          title="Invoice Information"
          size="sm"
        >
          <CreateTransaction
            due_amount={due_amount}
            invoiceId={invoiceId}
            refetch={refetch}
            closeModal={() => setIsPaymentModalOpen(false)}
          />
        </Modal>
      )}
      {/* {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Update Invoice Information"
          size="lg"
        >
          <UpdateInvoice
            invoiceData={selectedInvoiceData}
            isLoading={isLoading}
            closeModal={() => setIsEditModalOpen(false)}
            invoiceId={selectedInvoiceId}
            refetch={refetch}
          />
        </Modal>
      )}
*/}
      {isDeleteModalOpen && (
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Delete this invoice?"
        >
          <form className="space-y-4">
            <div className="space-y-1"></div>
          </form>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold">
              Are you sure want to delete this invoice?
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
                onClick={() => handleDeleteInvoice(selectedInvoiceId)}
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

export default InvoiceOption;
