import CreatePage from "./CreatePage";
import withAuthAndGroupCheck from "@/hoc/withAuthAndGroupCheck";
import { PAGE_NAME } from "@/variables/page-name";

function Page() {
    return (
        <>
            <CreatePage />
        </>
    );
}

export default withAuthAndGroupCheck(
    Page,
    PAGE_NAME.KESANTRIAN_KATEGORI_PELANGGARAN
);
