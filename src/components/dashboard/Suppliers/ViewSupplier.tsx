import { CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Phone, MapPin } from "lucide-react";
import { SupplierType } from "./SuppliersPage";
import Loader from "@/components/ui/Loader";
type SupplierProps = {
  supplierData: SupplierType;
  isLoading: boolean;
};
const ViewSupplier = ({ supplierData, isLoading }: SupplierProps) => {
  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  return (
    <>
      <div className="flex items-center space-x-4">
        <Avatar className="h-20 w-20 border">
          <AvatarFallback className="text-2xl font-bold">
            {supplierData?.name?.slice(0, 1)}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-2xl font-semibold text-gray-800">
            {supplierData?.name}
          </CardTitle>
          <p className="text-gray-700 mt-1">Supplier</p>
        </div>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
          <Mail className="h-5 w-5" />
          <span>{supplierData?.email}</span>
        </div>
        <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
          <Phone className="h-5 w-5" />
          <span>{supplierData?.phone}</span>
        </div>
        <div className="flex items-start space-x-3 text-gray-700 dark:text-gray-300">
          <MapPin className="h-5 w-5 mt-1" />
          <span>{supplierData?.address}</span>
        </div>
      </div>
    </>
  );
};

export default ViewSupplier;
