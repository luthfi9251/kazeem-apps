"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { saveEditedGroup } from "./_actions/group";
import { toast } from "react-toastify";
import { useContext } from "react";
import { GroupContext } from "./GroupDataProvider";
export default function ModalEditGroupContext({
    isOpen,
    setIsOpen,
    group,
    children,
    data,
    setData,
}) {
    let [dataGroup, setDataGroup] = useContext(GroupContext);
    let saveGroup = saveEditedGroup;

    let handleSubmitForm = (e) => {
        e.preventDefault();

        let formData = {
            id: group?.id,
            nama_group: e.target[0].value,
            deskripsi: e.target[1].value,
        };

        toast
            .promise(
                () => saveGroup(group?.id, formData),
                {
                    pending: "Menyimpan data",
                    success: "Data berhasil disimpan",
                    error: "Gagal Menyimpan Data",
                },
                {
                    position: "bottom-right",
                }
            )
            .then(() => {
                setIsOpen(false);
                let findCurrentGroup = (elem) => {
                    return elem.id === group?.id;
                };
                let copyArr = [...dataGroup];
                copyArr.splice(
                    dataGroup.findIndex(findCurrentGroup),
                    1,
                    formData
                );
                setDataGroup([...copyArr]);
                // setData([...copyArr]);
            });
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Grup</DialogTitle>
                    </DialogHeader>
                    <form
                        onSubmit={handleSubmitForm}
                        className="flex flex-col gap-2 w-full py-5"
                    >
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="nama_group">Nama Grup</Label>
                            <Input
                                type="text"
                                id="nama_group"
                                name="nama_group"
                                defaultValue={group?.nama_group}
                                required
                            />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="deskripsi">Deskripsi</Label>
                            <Textarea
                                id="deskripsi"
                                name="deskripsi"
                                defaultValue={group?.deskripsi}
                                required
                            />
                        </div>
                        <Button type="submit" className="self-end">
                            Simpan
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
            {children}
        </>
    );
}
