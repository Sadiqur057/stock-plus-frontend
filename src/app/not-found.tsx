import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardFooter,
} from "@/components/ui/card";
// import notFoundImg from "@/assets/images/notfound.png";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div>
        <Image src="https://i.postimg.cc/CKcsMC3P/notfound.png" alt="Not found 404" width={420} height={120} />
      </div>
      <div className="w-full max-w-md">
        <CardContent className="text-center">
          <p className="text-xl mb-4">Oops! Page not found</p>
          <p className="text-muted-foreground mb-4">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button asChild variant="secondary" className="border">
            <Link href="/">Return to Home</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">Return to Dashboard</Link>
          </Button>
        </CardFooter>
      </div>
    </div>
  );
}
