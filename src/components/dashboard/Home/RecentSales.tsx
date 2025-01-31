import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const bookings = [
  {
    name: "Pradeep Bansal",
    bookingId: "PBSDB638",
    date: "25th July, 2020",
    time: "10:00 AM",
    status: "In Progress",
  },
  {
    name: "Neer Sehay",
    bookingId: "SSND5668",
    date: "28th July, 2020",
    time: "11:20 AM",
    status: "Completed",
  },
  {
    name: "Navneet Goyal",
    bookingId: "NGED9063",
    date: "29th July, 2020",
    time: "10:45 AM",
    status: "Rejected",
  },
  {
    name: "Chirag Tripathi",
    bookingId: "CTWD5338",
    date: "05th Aug, 2020",
    time: "10:30 AM",
    status: "Canceled",
  },
  {
    name: "Neer Sehay",
    bookingId: "SSND5668",
    date: "28th July, 2020",
    time: "11:20 AM",
    status: "Completed",
  },
  {
    name: "Navneet Goyal",
    bookingId: "NGED9063",
    date: "29th July, 2020",
    time: "10:45 AM",
    status: "Rejected",
  },
];

export function RecentSales() {
  return (
    <>
      <div className="p-0 mb-4 lg:mb-6">
        <h2 className="text-xl font-semibold tracking-tight">
          Recent Invoices
        </h2>
        <p className="text-sm text-muted-foreground">
          You have created 24 invoices this month.
        </p>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Booking ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow
                key={booking.bookingId}
                className="group hover:bg-primary/10"
              >
                <TableCell className="font-medium">{booking.name}</TableCell>
                <TableCell>{booking.bookingId}</TableCell>
                <TableCell>{booking.date}</TableCell>
                <TableCell>{booking.time}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={
                      booking.status === "In Progress"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : booking.status === "Completed"
                        ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                        : booking.status === "Rejected"
                        ? "bg-red-100 text-red-800 hover:bg-red-100"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                    }
                  >
                    {booking.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
