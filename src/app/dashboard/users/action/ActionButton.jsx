"use client";

import { ArrowLeft } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { deleteUser } from "./_actions/userDataAction";
import { useContext } from "react";
import { GroupContext } from "./[[...slug]]/ActionPage";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

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

export default function ActionButton({ form }) {
    const [groupSelected, setGroupSelected, userId] = useContext(GroupContext);
    const router = useRouter();
    let handleSimpanForm = () => {
        form.current.submitForm();
    };

    let handleDelete = () => {
        toast.promise(
            () => deleteUser(userId),
            {
                pending: "Menghapus data",
                success: "Data berhasil dihapus",
                error: {
                    render({ data }) {
                        // When the promise reject, data will contains the error
                        return `Tidak dapat menghapus user!`;
                    },
                },
            },
            {
                position: "bottom-right",
            }
        );
    };

    return (
        <div className="md:col-span-2 col-span-1 flex gap-2 justify-between">
            <div className="flex gap-2">
                <Link href="/dashboard/users/">
                    <Button variant="outline" className="mr-3">
                        <ArrowLeft />
                    </Button>
                </Link>
                <Button
                    className="md:w-36 bg-kazeem-primary hover:bg-kazeem-darker"
                    onClick={handleSimpanForm}
                >
                    Simpan
                </Button>
                <Link href="/dashboard/users/">
                    <Button
                        variant="outline"
                        className="md:w-36 border-kazeem-primary"
                    >
                        Cancel
                    </Button>
                </Link>
            </div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        variant="outline"
                        disabled={userId ? false : true}
                        className="md:w-36 bg-red-500 justify-items-end hover:bg-red-800"
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
                        <AlertDialogAction onClick={() => handleDelete(userId)}>
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
