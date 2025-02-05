import { FileQuestion } from "lucide-react";
import {
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


const EmptyMessage = () => {
  return (
    <>
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-semibold text-gray-800">
          No Data Found
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-2 space-y-4">
        <div
          className="transition-all duration-300 ease-in-out transform scale-100"
        >
          <FileQuestion size={80} className="text-gray-400" />
        </div>
        <p className="text-center text-gray-600">
          It looks like there&apos;s no data to display at the moment.
          <br />
          Would you like to add some?
        </p>
      </CardContent>
    </>
  );
};

export default EmptyMessage;
