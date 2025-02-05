import {
  ClipboardPlus,
  Eye,
  FilePenLine,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
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
import ViewProduct from "./ViewProduct";
import { ProductShape } from "@/types/product.type";
import toast from "react-hot-toast";
import UpdateProduct from "./UpdateProduct";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type Props = {
  productId: string;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<ProductShape[], Error>>;
};

const ProductAction = ({ productId, refetch }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isAddStockModalOpen, setIsAddStockModalOpen] =
    useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [selectedProductData, setSelectedProductData] = useState({});

  const handleFetchProductData = async (id: string) => {
    setIsLoading(true);
    try {
      const result = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/product/${id}`
      );
      setSelectedProductData(result?.data?.data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProductStock = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const quantity = e.currentTarget.quantity.value;
    const data = { quantity: quantity };
    try {
      const result = await api.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/add-stock/${selectedProductId}`,
        data
      );
      if (!result.data?.success) {
        return toast.error(result?.data?.message || "Something went wrong!");
      }
      toast.success(result?.data?.message);
      refetch();
      setIsAddStockModalOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const result = await api.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/product/${id}`
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
            <DropdownMenuItem
              onClick={() => {
                setIsViewModalOpen(true);
                handleFetchProductData(productId);
              }}
            >
              <Eye className="text-muted-foreground" />
              <span>View Product</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                setIsEditModalOpen(true);
                handleFetchProductData(productId);
                setSelectedProductId(productId);
              }}
            >
              <FilePenLine className="text-muted-foreground" />
              <span>Edit Product</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setIsAddStockModalOpen(true);
                handleFetchProductData(productId);
                setSelectedProductId(productId);
              }}
            >
              <ClipboardPlus className="text-muted-foreground" />
              <span>Add Stock</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedProductId(productId);
              }}
            >
              <Trash2 className="text-red-700" />
              <span className="text-red-700">Delete Product</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>

      {isViewModalOpen && (
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title="Product Information"
          size="lg"
        >
          <ViewProduct
            productData={selectedProductData}
            isLoading={isLoading}
          />
        </Modal>
      )}
      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Update Product Information"
          size="lg"
        >
          <UpdateProduct
            productData={selectedProductData}
            isLoading={isLoading}
            closeModal={() => setIsEditModalOpen(false)}
            productId={selectedProductId}
            refetch={refetch}
          />
        </Modal>
      )}
      {isAddStockModalOpen && (
        <Modal
          isOpen={isAddStockModalOpen}
          onClose={() => setIsAddStockModalOpen(false)}
          title="Update Product Stock"
          size="sm"
        >
          <form onSubmit={handleAddProductStock} className="space-y-4">
            <div className="space-y-4 lg:space-y-6">
              <div className="space-y-1">
                <Label htmlFor="name">Quantity</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  placeholder="Enter product quantity"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="w-full">
                <ClipboardPlus /> Add Stock
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Delete this product?"
        >
          <div className="space-y-3">
            <h3 className="text-xl font-semibold">
              Are you sure want to delete this product?
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
                onClick={() => handleDeleteProduct(selectedProductId)}
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

export default ProductAction;
