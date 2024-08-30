import Image from "next/image";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

function DisplayText({ title, value }) {
    return (
        <div className="w-full flex flex-col items-center gap-1">
            <h2 className="font-bold text-md">{title}</h2>
            <p className="font-sm">{value}</p>
        </div>
    );
}

export default function SantriProfileSection() {
    return (
        <Card className=" col-span-1 flex flex-col items-center p-2 md:p-5 gap-5 rounded">
            <Image
                width={200}
                height={200}
                src="/foto/0f695fe654e40d770b4864fc693b47eabf07371c.png"
                alt="Foto Santri"
                className="aspect-square object-cover object-center rounded-full max-w-[200px] border-2"
            />
            <div className="text-center">
                <h1 className=" font-bold text-xl md:text-3xl">John Doe</h1>
                <span>33210155487965</span>
            </div>
            <div className="flex flex-col gap-2">
                <DisplayText
                    title="Lorem Ipsum"
                    value="Ini adalah value teks"
                />
                <DisplayText
                    title="Lorem Ipsum"
                    value="Ini adalah value teks"
                />
                <DisplayText
                    title="Lorem Ipsum"
                    value="Ini adalah value teks"
                />
                <DisplayText
                    title="Lorem Ipsum"
                    value="Ini adalah value teks"
                />
            </div>
        </Card>
    );
}
