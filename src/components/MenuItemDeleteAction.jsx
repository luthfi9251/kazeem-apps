"use state";
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
import { Input } from "./ui/input";
import { useMemo, useState } from "react";

export default function MenuItemDeleteAction({
    onDeletehandle,
    onOpenChange,
    open,
}) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
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
                    <AlertDialogAction onClick={onDeletehandle}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export function MenuItemDeleteActionWithConfirmation({
    challengeText,
    onDeletehandle,
    onOpenChange,
    open,
}) {
    const [inputVal, setInputVal] = useState(null);
    const [error, setError] = useState(null);
    const isSame = useMemo(() => inputVal === challengeText, [inputVal]);

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
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
                    <AlertDialogDescription>
                        Silahkan isi teks{" "}
                        <span className="font-bold">"{challengeText}"</span>{" "}
                        sebagai konfirmasi.
                        <Input
                            className="mt-2"
                            onChange={(e) => setInputVal(e.target.value)}
                        />
                        {!isSame && (
                            <span className="block bg-red-500 p-1 text-white my-2 rounded">
                                Teks tidak sama!
                            </span>
                        )}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onDeletehandle}
                        disabled={!isSame}
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
