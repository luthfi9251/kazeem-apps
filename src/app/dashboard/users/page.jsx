import { DataTable } from "./data-table";
import { columns } from "./columns";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/security-config";

async function getData() {
    let usersData = await prisma.user.findMany({
        select: {
            id: true,
            username: true,
            email: true,
            nama_lengkap: true,
            aktif: true,
        },
    });
    return usersData;
}

async function Users(props) {
    const user = await getData();

    return (
        <div className="md:p-5 p-2">
            <Card>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={user} />
                </CardContent>
            </Card>
        </div>
    );
}

export default withAuthAndGroupCheck(Users, PAGE_NAME.MANAGE_USER_PAGE);
