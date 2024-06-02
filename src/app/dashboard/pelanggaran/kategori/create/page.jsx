import CreatePage from "./CreatePage";
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/security-config";

function Page() {
    return (
        <>
            <CreatePage />
        </>
    );
}

export default withAuthAndGroupCheck(Page, PAGE_NAME.MANAGE_PELANGGARAN_PAGE);
