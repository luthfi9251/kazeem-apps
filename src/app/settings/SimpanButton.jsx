"use client";
import { Button } from "@/components/ui/button";

export default function SimpanButton() {
    let { status } = useFormStatus();
    return <Button type="submit">Simpan</Button>;
}
