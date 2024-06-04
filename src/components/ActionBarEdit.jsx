import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ActionBarEdit({
    handleSimpan,
    backLink,
    handleDelete,
}) {
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
            <Link href={backLink}>
                <Button
                    variant="outline"
                    className="md:w-36 border-kazeem-primary "
                >
                    Cancel
                </Button>
            </Link>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        variant="outline"
                        data-e2e="btn-hapus"
                        className="text-white md:w-36 bg-red-500 justify-items-end hover:bg-red-800"
                    >
                        Hapus
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            data-e2e="btn-confirm"
                        >
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
