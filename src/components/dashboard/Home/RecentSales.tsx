import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { Invoice } from "@/types/invoice.type";
import SectionHeader from "./SectionHeader";
import EmptyMessage from "./EmptyMessage";
type Props = {
  invoices: Invoice[];
};
export function RecentSales({ invoices }: Props) {
  return (
    <>
      <SectionHeader
        buttonText="View All"
        header="Recent Invoices"
        text={`You have created ${invoices?.length} invoices.`}
        url="/dashboard/invoices"
      />
      {invoices?.length ? (
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>
                  Amount <span className="text-[10px]">(BDT)</span>
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
                  <TableCell>{invoice?.cost_summary?.total}</TableCell>
                  <TableCell>
                    {invoice?.created_at &&
                      formatDate(invoice?.created_at)}
                  </TableCell>
                  <TableCell>{invoice?.cost_summary?.total_due}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        invoice?.cost_summary?.status === "paid"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : invoice?.cost_summary?.status === "partially paid"
                          ? "bg-orange-100 text-blue-800 hover:bg-blue-100"
                          : invoice?.cost_summary?.status === "unpaid"
                          ? "bg-red-100 text-red-800 hover:bg-red-100"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                      }
                    >
                      {invoice?.cost_summary?.status === "partially paid"
                        ? "due"
                        : invoice?.cost_summary?.status}
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
