import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  limit: number;
  onLimitChange: (limit: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  limit,
  onLimitChange,
}: PaginationProps) {
  const limits = [10, 20, 50, 100];

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const showEllipsis = totalPages > 7;

    if (showEllipsis) {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(
            <PageButton
              key={i}
              page={i}
              isActive={currentPage === i}
              onClick={() => onPageChange(i)}
            />
          );
        }
        pageNumbers.push(<Ellipsis key="ellipsis-end" />);
        pageNumbers.push(
          <PageButton
            key={totalPages}
            page={totalPages}
            isActive={currentPage === totalPages}
            onClick={() => onPageChange(totalPages)}
          />
        );
      } else if (currentPage >= totalPages - 3) {
        pageNumbers.push(
          <PageButton
            key={1}
            page={1}
            isActive={currentPage === 1}
            onClick={() => onPageChange(1)}
          />
        );
        pageNumbers.push(<Ellipsis key="ellipsis-start" />);
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(
            <PageButton
              key={i}
              page={i}
              isActive={currentPage === i}
              onClick={() => onPageChange(i)}
            />
          );
        }
      } else {
        pageNumbers.push(
          <PageButton
            key={1}
            page={1}
            isActive={currentPage === 1}
            onClick={() => onPageChange(1)}
          />
        );
        pageNumbers.push(<Ellipsis key="ellipsis-start" />);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(
            <PageButton
              key={i}
              page={i}
              isActive={currentPage === i}
              onClick={() => onPageChange(i)}
            />
          );
        }
        pageNumbers.push(<Ellipsis key="ellipsis-end" />);
        pageNumbers.push(
          <PageButton
            key={totalPages}
            page={totalPages}
            isActive={currentPage === totalPages}
            onClick={() => onPageChange(totalPages)}
          />
        );
      }
    } else {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <PageButton
            key={i}
            page={i}
            isActive={currentPage === i}
            onClick={() => onPageChange(i)}
          />
        );
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 my-6">
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-700">Show</span>
        <Select
          value={limit.toString()}
          onValueChange={(value) => onLimitChange(Number(value))}
        >
          <SelectTrigger className="w-[70px]">
            <SelectValue placeholder={limit} />
          </SelectTrigger>
          <SelectContent>
            {limits.map((l) => (
              <SelectItem key={l} value={l.toString()}>
                {l}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-gray-700">per page</span>
      </div>
      <nav className="flex items-center space-x-1">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {renderPageNumbers()}
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </nav>
    </div>
  );
}

function PageButton({
  page,
  isActive,
  onClick,
}: {
  page: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      variant={isActive ? "default" : "outline"}
      size="icon"
      onClick={onClick}
    >
      {page}
    </Button>
  );
}

function Ellipsis() {
  return <MoreHorizontal className="h-4 w-4" />;
}
