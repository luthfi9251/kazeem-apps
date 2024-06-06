import { LoaderCircle } from "lucide-react";
export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="h-screen grid place-items-center">
            <LoaderCircle className="h-6 w-6 animate-spin" />
        </div>
    );
}
