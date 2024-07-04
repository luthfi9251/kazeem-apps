import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { PAGE_NAME } from "@/variables/page-name";
import { getAllPageName, getGroupDataById } from "@/actions/group";
import EditPage from "../EditPage";
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";

async function Page(props) {
    let pageData = await getAllPageName();
    let groupData = await getGroupDataById(props.params.groupId);

    return (
        <div className="md:p-5 p-2">
            <Card>
                <CardHeader>
                    <CardTitle>Edit Group</CardTitle>
                    <CardDescription>
                        Silahkan Mengubah Data Group
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <EditPage
                        pagesData={pageData}
                        defaultValue={groupData}
                        id={props.params.groupId}
                    />
                </CardContent>
            </Card>
        </div>
    );
}

export default withAuthAndGroupCheck(Page, PAGE_NAME.USER_GROUP_HOME);
