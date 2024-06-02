import CreatePage from "./CreatePage";
import KelasDataProvider from "./KelasDataProvider";
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/security-config";

function Page() {
    return (
        <KelasDataProvider>
            <CreatePage />
        </KelasDataProvider>
    );
}

export default withAuthAndGroupCheck(Page, PAGE_NAME.MANAGE_MADRASAH_PAGE);
