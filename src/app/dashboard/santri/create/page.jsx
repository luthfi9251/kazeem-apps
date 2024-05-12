import PageCreateSantri from "./CreatePage";
import WaliDataProvider from "../WaliDataProvider";
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/security-config";
async function Page() {
    return (
        <WaliDataProvider data={[]}>
            <PageCreateSantri />
        </WaliDataProvider>
    );
}

export default withAuthAndGroupCheck(Page, PAGE_NAME.MANAGE_SANTRI_PAGE);
