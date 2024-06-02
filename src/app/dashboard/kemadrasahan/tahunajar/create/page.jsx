import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/security-config";
import CreatePage from "./CreatePage";

function Page() {
    return <CreatePage />;
}

export default withAuthAndGroupCheck(Page, PAGE_NAME.MANAGE_SANTRI_PAGE);
