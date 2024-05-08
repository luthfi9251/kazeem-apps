import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { getAllGroups } from "./_actions/group";
import GroupsForm from "./GroupsForm";
import GroupsTable from "./GroupsTable";
import GroupDataProvider from "./GroupDataProvider";

async function getData() {
    let data = await getAllGroups();
    return data;
}

export default async function PageGroups() {
    let groupData = await getData();

    return (
        <div className="md:p-5 p-2">
            <Card>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 divide-y gap-2 md:divide-x md:divide-y-0">
                    <GroupDataProvider data={groupData}>
                        <GroupsTable />
                        <GroupsForm />
                    </GroupDataProvider>
                </CardContent>
            </Card>
        </div>
    );
}
