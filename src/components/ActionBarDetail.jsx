import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ActionBarDetail({ editLink, backLink }) {
    return (
        <div className="flex gap-2 col-span-1 md:col-span-2">
            <Link href={backLink}>
                <Button variant="outline" className="mr-3">
                    <ArrowLeft />
                </Button>
            </Link>
            <Link href={editLink} data-e2e="btn-edit">
                <Button className="md:w-36 bg-kazeem-primary hover:bg-kazeem-darker">
                    Edit
                </Button>
            </Link>
        </div>
    );
}
