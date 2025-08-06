import Link from "next/link";
import { Button } from "@/shared/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center text-center">
      <div className="max-w-md">
        <h1 className="text-PrimaryYellow text-6xl font-bold">404</h1>
        <h2 className="text-PrimaryText mt-4 text-2xl font-semibold">
          Trading Pair Not Found
        </h2>
        <p className="text-SecondaryText mt-2">
          The cryptocurrency pair you are looking for does not exist or is not
          supported on Alpin Exchange. Please check the symbol and try again.
        </p>
        <div className="mt-8">
          <Link href="/public">
            <Button variant="primary" className="px-6 py-3 text-base">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
