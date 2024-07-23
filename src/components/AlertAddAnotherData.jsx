"use client";

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

export default function AlertAddAnotherData({
    open,
    openChange,
    successAction,
}) {
    return (
        <AlertDialog open={open} onOpenChange={openChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Apakah anda ingin menambahkan data lain?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Anda akan tetap berada pada halaman ini untuk
                        menambahkan data baru
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={successAction.onNo}>
                        Tidak
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={successAction.onYes}>
                        Ya
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
