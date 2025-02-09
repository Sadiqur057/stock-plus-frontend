import {
  CalendarClock,
} from "lucide-react";
import Loader from "@/components/ui/Loader";
import { beautifyDate, getFormattedPrice } from "@/lib/utils";
import { RevenueType } from "../RevenuesPage";
import { Separator } from "@/components/ui/separator";

type RevenueProps = {
  revenueData: RevenueType;
  isLoading: boolean;
};
const ViewRevenue = ({ revenueData: data, isLoading }: RevenueProps) => {
  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  return (
    <>
      <>
        <div className="flex flex-col sm:flex-row justify-between gap-2  mb-3 sm:mb-4">
          <p className="text-xl lg:text-2xl font-semibold">
            Invoice Revenue
          </p>
          <div className="sm:text-right">
            <p className="text-sm text-muted-foreground flex gap-2 items-center">
              <CalendarClock size="16" /> {beautifyDate(data?.created_at)}
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div className="space-y-1">
            <p className="text-sm font-medium">Customer</p>
            <p className="text-sm text-muted-foreground">
              {data?.customer_name}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Created by</p>
            <p className="text-sm text-muted-foreground">{data?.created_by_name}</p>
          </div>
        </div>

        <div className="grid gap-6 mt-6">
          <Separator />
          <div className="flex flex-col md:flex-row justify-between gap-2 md:py-2">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Total Cost
              </p>
              <p className="text-xl md:text-2xl font-semibold">
                BDT. {getFormattedPrice(data?.total_cost)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Revenue
              </p>
              <p className="text-xl md:text-2xl font-semibold text-green-600">
                BDT. {getFormattedPrice(data?.revenue)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Revenue %
              </p>
              <p className="text-xl md:text-2xl font-semibold text-blue-600">
                {data?.revenue_percentage.toFixed(2)}%
              </p>
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="text-lg font-semibold mb-2">Products</h3>
            <ul className="space-y-3">
              {data?.products?.map((product) => (
                <li
                  key={product._id}
                  className="flex gap-2 flex-col sm:flex-row sm:justify-between sm:items-center"
                >
                  <div>
                    <p className="font-medium">{product.productName}</p>
                    <p className="text-sm text-muted-foreground">
                      {product.company}
                    </p>
                  </div>
                  <div className="sm:text-right">
                    <p className="font-medium">
                      {getFormattedPrice(Number(product.salePrice.toFixed(2)))}{" "}
                      x {product.quantity}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Total: &nbsp;
                      {getFormattedPrice(
                        Number(
                          (product.salePrice * product.quantity).toFixed(2)
                        )
                      ) }  BDT.
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    </>
  );
};

export default ViewRevenue;
