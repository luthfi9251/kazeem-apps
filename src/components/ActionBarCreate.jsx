"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ActionBarCreate({ handleSimpan, backLink }) {
    return (
        <div className="flex gap-2 col-span-1 md:col-span-2">
            <Link href={backLink}>
                <Button variant="outline" className="mr-3">
                    <ArrowLeft />
                </Button>
            </Link>
            <Button
                onClick={handleSimpan}
                data-e2e="btn-simpan"
                className="md:w-36 bg-kazeem-primary hover:bg-kazeem-darker"
            >
                Simpan
            </Button>
        </div>
    );
}
