import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { getAllGroups } from "./_actions/group";
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/variables/page-name";
import { DataTable } from "./data-table";

async function getData() {
    let data = await getAllGroups();
    return data;
}

async function PageGroups() {
    let groupData = await getData();

    return (
        <div className="md:p-5 p-2">
            <Card>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable data={groupData} />
                </CardContent>
            </Card>
        </div>
    );
}

export default withAuthAndGroupCheck(PageGroups, PAGE_NAME.USER_GROUP_HOME);
