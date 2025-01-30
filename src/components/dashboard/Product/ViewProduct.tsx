import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Package, DollarSign, Tag, Info } from "lucide-react";
import Loader from "@/components/ui/Loader";
import { ProductShape } from "@/types/product.type";

type productProps = {
  productData: ProductShape;
  isLoading: boolean;
};

const ViewProduct = ({ productData, isLoading }: productProps) => {
  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  return (
    <CardContent className="py-1 p-0">
      <div className="grid gap-6 mb-8">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              <h1 className="text-xl font-semibold">
                {productData?.productName}
              </h1>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="h-4 w-4 mr-1" />
              <span>{productData?.company}</span>
            </div>
          </div>
          <Badge variant="secondary" className="h-fit">
            <Tag className="h-3 w-3 mr-1" />
            {productData?.remarks}
          </Badge>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 pt-4">
          <div className="flex items-center gap-2 p-3 border rounded-lg">
            <Package className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Quantity</p>
              <p className="font-medium">{productData?.quantity}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 border rounded-lg">
            <DollarSign className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Purchase Price</p>
              <p className="font-medium">BDT. {productData?.purchasePrice}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 border rounded-lg">
            <Tag className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Sale Price</p>
              <p className="font-medium">BDT. {productData?.salePrice}</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <Info className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Product Attributes</h2>
        </div>
        {productData?.attributes?.length ? (
          <Table className="border">
            <TableHeader>
              <TableRow>
                <TableHead>Attribute</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productData?.attributes?.map((attribute) => (
                <TableRow key={attribute?.key}>
                  <TableCell className="font-medium">
                    {attribute?.key}
                  </TableCell>
                  <TableCell>{attribute?.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center my-2">
            No attributes found for this product
          </p>
        )}
      </div>
    </CardContent>
  );
};

export default ViewProduct;
