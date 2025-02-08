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
import ViewRevenue from "./ViewRevenue";
import toast from "react-hot-toast";
import { RevenueType } from "../RevenuesPage";

type Props = {
  revenueId: string;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<RevenueType[], Error>>;
};

const RevenueOption = ({ revenueId, refetch }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  // const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedRevenueId, setSelectedRevenueId] = useState<string>("");
  const [selectedRevenueData, setSelectedRevenueData] = useState<RevenueType>({
    _id: "",
    total_cost: 0,
    revenue: 0,
    revenue_percentage: 0,
    created_at: "",
    company_email: "",
    created_by: "",
    customer_email: "",
    customer_name: "",
  });
  const handleFetchRevenueData = async (id: string) => {
    setIsLoading(true);
    console.log("id", id);
    try {
      const result = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/revenue/${id}`
      );
      console.log("revenue result", result);
      setSelectedRevenueData(result?.data?.data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRevenue = async (id: string) => {
    try {
      const result = await api.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/delete-revenue/${id}`
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
                handleFetchRevenueData(revenueId);
              }}
            >
              <Eye className="text-muted-foreground" />
              <span>View Revenue</span>
            </DropdownMenuItem>

            {/* <DropdownMenuItem
              onClick={() => {
                setIsEditModalOpen(true);
                handleFetchRevenueData(revenueId);
                setSelectedRevenueId(revenueId);
              }}
            >
              <FilePenLine className="text-muted-foreground" />
              <span>Edit Revenue</span>
            </DropdownMenuItem> */}

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedRevenueId(revenueId);
              }}
            >
              <Trash2 className="text-red-700" />
              <span className="text-red-700">Delete Revenue</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>

      {isViewModalOpen && (
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title="Revenue Information"
          size="lg"
        >
          <ViewRevenue
            revenueData={selectedRevenueData}
            isLoading={isLoading}
          />
        </Modal>
      )}
      {/* {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Update Revenue Information"
          size="lg"
        >
          <UpdateRevenue
            revenueData={selectedRevenueData}
            isLoading={isLoading}
            closeModal={() => setIsEditModalOpen(false)}
            revenueId={selectedRevenueId}
            refetch={refetch}
          />
        </Modal>
      )} */}

      {isDeleteModalOpen && (
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Delete this revenue?"
        >
          <form className="space-y-4">
            <div className="space-y-1"></div>
          </form>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold">
              Are you sure want to delete this revenue?
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
                onClick={() => handleDeleteRevenue(selectedRevenueId)}
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

export default RevenueOption;
