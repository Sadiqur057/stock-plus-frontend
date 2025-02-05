import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type Props = {
  header: string;
  text: string;
  buttonText: string;
  url: string;
};

const SectionHeader = ({ header, text, buttonText, url }: Props) => {
  return (
    <div className="p-0 mb-4 lg:mb-6 flex gap-3 items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">{header}</h2>
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
      <Link href={url}>
        <Button variant="default" size="sm" className="text-xs h-8">
          {buttonText}
        </Button>
      </Link>
    </div>
  );
};

export default SectionHeader;
