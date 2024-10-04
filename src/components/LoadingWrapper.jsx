import { LoaderCircle } from "lucide-react";

export default function LoadingWrapper({ isLoading, children }) {
    if (isLoading) {
        return (
            <div className="w-full h-full flex justify-center">
                <LoaderCircle className=" animate-spin" />
            </div>
        );
    } else {
        return children;
    }
}
