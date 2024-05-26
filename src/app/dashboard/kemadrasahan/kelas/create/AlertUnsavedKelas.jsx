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

export default function AlertUnsavedKelas({
    open,
    onOpenChange,
    onSimpanClick,
    onCancelAction,
}) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Perubahan belum disimpan!
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Perubahan yang anda lakukan belum disimpan, apakah anda
                        ingin menyimpan perubahan?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={() => {
                            onOpenChange(false);
                            onCancelAction();
                        }}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction>Simpan</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
