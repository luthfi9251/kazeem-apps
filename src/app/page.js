import Image from "next/image";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <main className="flex justify-center items-center min-h-screen max-w-screen bg-kazeem-primary">
            <Card className="w-2/3 md:w-1/2 p-4">
                <CardContent className="space-y-5 flex flex-col">
                    <div className="relative h-36">
                        <Image
                            src="/kazeem-logo.png"
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                    <p className=" font-normal text-lg text-center">
                        Kazeem, aplikasi pondok pesantren online
                    </p>
                    <Link href="/login" className=" self-center">
                        <Button className=" bg-kazeem-secondary">Masuk</Button>
                    </Link>
                </CardContent>
            </Card>
        </main>
    );
}
