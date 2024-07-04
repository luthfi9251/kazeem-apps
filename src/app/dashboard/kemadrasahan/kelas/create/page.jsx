import CreatePage from "./CreatePage";
import KelasDataProvider from "./KelasDataProvider";
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/variables/page-name";

function Page() {
    return (
        <KelasDataProvider>
            <CreatePage />
        </KelasDataProvider>
    );
}

export default withAuthAndGroupCheck(Page, PAGE_NAME.KEMADRASAHAN_KELOLA_KELAS);
