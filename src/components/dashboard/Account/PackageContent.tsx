import { CheckCircle, ShieldPlus } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

const PackageContent = () => {
  return (
    <>
      <h3 className="text-xl font-semibold mb-4">Current Package</h3>
      <p className="text-muted-foreground mb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, dicta
        delectus laborum, optio ipsa, rem est saepe et culpa repellat sint?
        Atque ducimus incidunt quas saepe nisi ipsam reprehenderit! Id.
      </p>
      <ul className="space-y-2">
        <li className="flex items-center">
          <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
          <span>Customized dashboard to analyze business progress.</span>
        </li>
        <li className="flex items-center">
          <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
          <span>Access to create invoices.</span>
        </li>
        <li className="flex items-center">
          <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
          <span>All customization regarding products.</span>
        </li>
        <li className="flex items-center">
          <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
          <span>Limited to 3 Employees account.</span>
        </li>
      </ul>
      <Button size="lg" className="mt-5 px-4">
        <ShieldPlus /> Upgrade Package
      </Button>
    </>
  );
};

export default PackageContent;
