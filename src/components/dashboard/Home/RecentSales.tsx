import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateShort, getCurrency } from "@/lib/utils";
import { Invoice } from "@/types/invoice.type";
import SectionHeader from "./SectionHeader";
import EmptyMessage from "./EmptyMessage";
type Props = {
  invoices: Invoice[];
};
export function RecentSales({ invoices }: Props) {
  const currency = getCurrency();
  return (
    <>
      <SectionHeader
        buttonText="View All"
        header="Recent Invoices"
        text={`Invoice from recent sales`}
        url="/dashboard/invoices"
      />
      {invoices?.length ? (
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>
                  Amount <span className="text-[10px]">({currency})</span>
                </TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Due</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices?.slice(0, 5)?.map((invoice) => (
                <TableRow
                  key={invoice?._id}
                  className="group hover:bg-primary/10"
                >
                  <TableCell>{invoice?.customer?.name}</TableCell>
                  <TableCell>{invoice?.total_cost?.total}</TableCell>
                  <TableCell>
                    {invoice?.created_at &&
                      formatDateShort(invoice?.created_at)}
                  </TableCell>
                  <TableCell>{invoice?.total_cost?.total_due}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        invoice?.total_cost?.status === "paid"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : invoice?.total_cost?.status === "partially paid"
                          ? "bg-orange-100 text-blue-800 hover:bg-blue-100"
                          : invoice?.total_cost?.status === "unpaid"
                          ? "bg-red-100 text-red-800 hover:bg-red-100"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                      }
                    >
                      {invoice?.total_cost?.status === "partially paid"
                        ? "due"
                        : invoice?.total_cost?.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <EmptyMessage />
      )}
    </>
  );
}
