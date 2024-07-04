import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import GroupForm from "../GroupForm";
import { getAllPageName } from "@/actions/group";
import CreatePage from "./CreatePage";
import { PAGE_NAME } from "@/variables/page-name";
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";

async function Page() {
    let pageData = await getAllPageName();

    return (
        <div className="md:p-5 p-2">
            <Card>
                <CardHeader>
                    <CardTitle>Tambah Group</CardTitle>
                    <CardDescription>
                        Silahkan Menambah Data Group
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <CreatePage pagesData={pageData} />
                </CardContent>
            </Card>
        </div>
    );
}

export default withAuthAndGroupCheck(Page, PAGE_NAME.USER_GROUP_HOME);
