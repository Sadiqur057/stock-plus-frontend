import { FilePenLine, MoreHorizontal, Trash2 } from "lucide-react";
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
import UpdateAttribute from "./UpdateAttribute";
import { AttributeType } from "./AttributePage";

type Props = {
  attributeId: string;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<AttributeType[], Error>>;
};

const AttributeOption = ({ attributeId, refetch }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedAttributeId, setSelectedAttributeId] = useState<string>("");
  const [selectedAttributeData, setSelectedAttributeData] =
    useState<AttributeType>({
      _id: "",
      name: "",
      description: "",
    });

  const handleFetchAttributeData = async (id: string) => {
    setIsLoading(true);
    console.log("id", id);
    try {
      const result = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/attribute/${id}`
      );
      setSelectedAttributeData(result?.data?.data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAttribute = async (id: string) => {
    try {
      const result = await api.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/delete-attribute/${id}`
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
                setIsEditModalOpen(true);
                handleFetchAttributeData(attributeId);
                setSelectedAttributeId(attributeId);
              }}
            >
              <FilePenLine className="text-muted-foreground" />
              <span>Edit Attribute</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedAttributeId(attributeId);
              }}
            >
              <Trash2 className="text-red-700" />
              <span className="text-red-700">Delete Attribute</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>

      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Update Attribute Information"
          size="sm"
        >
          <UpdateAttribute
            attributeData={selectedAttributeData}
            isLoading={isLoading}
            closeModal={() => setIsEditModalOpen(false)}
            attributeId={selectedAttributeId}
            refetch={refetch}
          />
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Delete this attribute?"
        >
          <form className="space-y-4">
            <div className="space-y-1"></div>
          </form>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold">
              Are you sure want to delete this attribute?
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
                onClick={() => handleDeleteAttribute(selectedAttributeId)}
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

export default AttributeOption;
