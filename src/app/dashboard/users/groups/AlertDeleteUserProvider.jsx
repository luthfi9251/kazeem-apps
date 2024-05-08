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
import { deleteGroup } from "./_actions/group";
import { toast } from "react-toastify";
import { useContext } from "react";
import { GroupContext } from "./GroupDataProvider";

export default function AlertDeleteUserProvider({
    isOpen,
    group,
    children,
    onOpenChange,
}) {
    let [dataGroup, setDataGroup] = useContext(GroupContext);
    let handleDelete = () => {
        toast
            .promise(
                () => deleteGroup(group.id),
                {
                    pending: "Menghapus data",
                    success: "Data berhasil dihapus",
                    error: "Gagal menghapus Data",
                },
                {
                    position: "bottom-right",
                }
            )
            .then(() => {
                let dataTemp = dataGroup.filter((item) => item.id !== group.id);
                setDataGroup([...dataTemp]);
            });
    };
    return (
        <>
            <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
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
                        <AlertDialogAction onClick={handleDelete}>
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            {children}
        </>
    );
}
