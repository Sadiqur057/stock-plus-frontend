"use client";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
// import errorImage from "@/assets/images/error.png";
import Image from "next/image";

export default function Error() {
  const handleReload = () => {
    window.location.reload();
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div>
        <Image src="https://i.postimg.cc/yxZNgn2V/error.png" alt="Not found 404" width={220} height={100} />
      </div>
      <div className="w-full max-w-md mt-10">
        <CardContent className="text-center">
          <p className="text-xl font-medium mb-4">Oops! Something unexpected happened.</p>
          <p className="text-muted-foreground mb-4">
            The content you are looking for might have some issues. Please try
            reloading the page.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button onClick={handleReload}>Reload</Button>
        </CardFooter>
      </div>
    </div>
  );
}
