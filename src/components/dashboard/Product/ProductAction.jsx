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
const ProductAction = () => {
  const [isOpen, setIsOpen] = useState("");
  return (
    <>
      <SidebarMenuItem className="list-none border h-8 border-none">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuAction showOnHover>
              <MoreHorizontal />
              <span className="sr-only">More</span>
            </SidebarMenuAction>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-fit p-1 rounded-lg"
            side={"left"}
            align={"start"}
          >
            <DropdownMenuItem onClick={() => setIsOpen("view")}>
              <Eye className="text-muted-foreground" />
              <span>View Product</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsOpen("edit")}>
              <FilePenLine className="text-muted-foreground" />
              <span>Edit Product</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setIsOpen("delete")}>
              <Trash2 className="text-red-700" />
              <span className="text-red-700">Delete Product</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={
          isOpen === "view"
            ? "Product Information"
            : isOpen === "delete"
            ? "Confirm Deletion?"
            : "Update Product"
        }
      >
        <form className="space-y-4">
          <div className="space-y-1"></div>
        </form>

        {isOpen === "delete" && (
          <div className="space-y-3">
            <h3 className="text-xl font-semibold">
              Are you sure want to delete this product?
            </h3>
            <p className="pb-6">
              You won&apos;t be able to recover this again!
            </p>
            <div className="flex justify-end gap-3">
              <Button
                onClick={() => setIsOpen("")}
                className="py-3"
                variant="outline"
              >
                Cancel
              </Button>
              <Button className="py-3">Delete</Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ProductAction;
