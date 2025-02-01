import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  size?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = "sm",
}: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`w-[90%] ${
          size === "sm" ? "max-w-[475px]" : "max-w-[800px]"
        }`}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="mt-4 max-h-[70vh] overflow-auto custom-scrollbar">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
